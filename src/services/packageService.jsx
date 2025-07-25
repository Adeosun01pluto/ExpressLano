// services/packageService.js
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  serverTimestamp,
  onSnapshot,
  setDoc
} from 'firebase/firestore';
import { db } from '../firebase';


// // Helper to generate a unique ID for new packages (same as before)
// const generatePackageId = async () => {
//   const q = query(collection(db, 'packages'), orderBy('createdAt', 'desc'), limit(1));
//   const querySnapshot = await getDocs(q);
//   let lastIdNum = 0;

//   if (!querySnapshot.empty) {
//     const lastPackage = querySnapshot.docs[0].data();
//     const match = lastPackage.packageId.match(/PKG(\d+)/);
//     if (match) {
//       lastIdNum = parseInt(match[1]);
//     }
//   }
//   const newIdNum = lastIdNum + 1;
//   return `PKG${String(newIdNum).padStart(4, '0')}`;
// };

/**
 * Generates a unique package ID in the format ELXXXXXXXX-YY.
 * The X's are a random 8-digit number, and YY is a fixed suffix (e.g., 'DB').
 * It checks for uniqueness against existing package IDs in Firestore.
 *
 * @param {string} [suffix='DB'] Optional: A two-letter suffix for the ID. Defaults to 'DB'.
 * @returns {Promise<string>} A unique package ID.
 */
export const generatePackageId = async (suffix = 'DB') => {
  let newId;
  let isUnique = false;
  const packagesCollectionRef = collection(db, 'packages');

  // Loop until a unique ID is generated
  while (!isUnique) {
    // Generate a random 8-digit number
    // Math.random() gives a number between 0 (inclusive) and 1 (exclusive)
    // Multiplying by 10^8 gives a number up to 99,999,999.99...
    // Math.floor truncates it, then padStart ensures 8 digits.
    const randomNumber = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');

    newId = `EL${randomNumber}-${suffix.toUpperCase()}`; // Ensure suffix is uppercase

    // Check if this newId already exists in Firestore
    const q = query(packagesCollectionRef, where('packageId', '==', newId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      isUnique = true; // ID is unique, exit loop
    } else {
      console.warn(`Generated ID ${newId} already exists. Retrying...`);
      // If it exists, loop again to generate another ID
    }
  }

  return newId;
};

export const createPackage = async (packageData) => {
  try {
    const newPackageId = await generatePackageId();
    const newPackageRef = doc(collection(db, 'packages'));

    await setDoc(newPackageRef, {
      ...packageData,
      id: newPackageRef.id,
      packageId: newPackageId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      currentStatus: packageData.currentStatus || 'Order Placed',
      trackingHistory: [
        {
          status: packageData.currentStatus || 'Order Placed',
          timestamp: new Date(),
          location: packageData.origin || 'N/A',
          note: 'Package created.',
        },
      ],
    });
    
    console.log("New package created with ID:", newPackageRef.id);
    return newPackageRef.id;
    
  } catch (error) {
    console.error("Error creating package: ", error);
    throw error;
  }
};

export const updatePackage = async (id, packageData, invoiceFile) => {
  try {
    const packageRef = doc(db, 'packages', id);
    const existingPackageSnap = await getDoc(packageRef);

    if (!existingPackageSnap.exists()) {
      throw new Error("Package not found.");
    }

    const existingPackage = existingPackageSnap.data();
    let newInvoiceUrl = existingPackage.invoiceUrl || null;

    // Handle invoice file updates
    if (invoiceFile) {
      try {
        // If there's an existing invoice, log the replacement
        if (existingPackage.invoiceUrl) {
          console.log("Replacing existing invoice with new upload");
          // In production, implement secure deletion here
          // await deleteInvoicePdf(existingPackage.invoiceUrl);
        }
        
        newInvoiceUrl = await uploadInvoicePdf(invoiceFile, id);
        console.log('New invoice uploaded successfully:', newInvoiceUrl);
        
      } catch (uploadError) {
        console.error('Invoice upload failed during update:', uploadError);
        throw new Error(`Failed to upload new invoice: ${uploadError.message}`);
      }
    }
    // Handle explicit invoice removal
    else if (packageData.hasOwnProperty('invoiceUrl') && packageData.invoiceUrl === null) {
      if (existingPackage.invoiceUrl) {
        console.log("Removing existing invoice as requested");
        // In production, implement secure deletion here
        // await deleteInvoicePdf(existingPackage.invoiceUrl);
      }
      newInvoiceUrl = null;
    }

    await updateDoc(packageRef, {
      ...packageData,
      invoiceUrl: newInvoiceUrl,
      updatedAt: new Date(),
    });
    
    console.log("Package updated successfully!");
    
  } catch (error) {
    console.error("Error updating package: ", error);
    throw error;
  }
};

/**
 * Deletes a package document from Firestore based on its 'packageId' field.
 * This function queries for the document where the 'packageId' field matches
 * the provided value, and then deletes that document.
 *
 * @param {string} packageIdToDelete The value of the 'packageId' field to match for deletion.
 * @returns {Promise<boolean>} True if a package was found and deleted, false otherwise or on error.
 */
export const deletePackage = async (packageIdToDelete) => {
  if (!packageIdToDelete) {
    console.error("No 'packageId' field value provided for deletion.");
    return false;
  }

  try {
    const packagesCollectionRef = collection(db, 'packages');
    
    // Create a query to find the document where the 'packageId' field matches
    const q = query(packagesCollectionRef, where('packageId', '==', packageIdToDelete));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn(`No package found with packageId field: ${packageIdToDelete}`);
      return false;
    }

    // Since 'packageId' should ideally be unique, we expect at most one document.
    // If there could be multiple, you'd loop here and delete all found.
    // For now, we'll assume uniqueness and delete the first one found.
    const docToDelete = querySnapshot.docs[0];
    const docRef = docToDelete.ref; // Get the DocumentReference

    // Log the data before deletion (optional, for debugging)
    const packageData = docToDelete.data();
    console.log("Found package to delete:", packageData);

    await deleteDoc(docRef);
    console.log(`Package with packageId field: ${packageIdToDelete} and Firestore Doc ID: ${docToDelete.id} successfully deleted!`);
    return true;

  } catch (e) {
    console.error(`Error deleting package with packageId field ${packageIdToDelete}: `, e);
    throw e; // Re-throw to allow calling functions to catch it
  }
};
// Existing functions (no changes needed)
export const getPackages = async () => {
  try {
    const packagesCol = collection(db, 'packages');
    const q = query(packagesCol, orderBy('createdAt', 'desc'));
    const packageSnapshot = await getDocs(q);
    const packageList = packageSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return packageList;
  } catch (e) {
    console.error("Error getting packages: ", e);
    throw e;
  }
};

export const subscribeToPackages = (callback, errorCallback) => {
  const q = query(collection(db, 'packages'), orderBy('createdAt', 'desc'));
  const unsubscribe = onSnapshot(q,
    (querySnapshot) => {
      const packages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore Timestamps to JS Date objects for consistency
        createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : doc.data().createdAt,
        updatedAt: doc.data().updatedAt?.toDate ? doc.data().updatedAt.toDate() : doc.data().updatedAt,
        estimatedDeliveryDate: doc.data().estimatedDeliveryDate?.toDate ? doc.data().estimatedDeliveryDate.toDate() : doc.data().estimatedDeliveryDate,
        trackingHistory: doc.data().trackingHistory?.map(entry => ({
          ...entry,
          timestamp: entry.timestamp?.toDate ? entry.timestamp.toDate() : entry.timestamp,
        })) || [],
      }));
      callback(packages);
    },
    (error) => {
      console.error("Error subscribing to packages:", error);
      errorCallback(error);
    }
  );
  return unsubscribe;
};


export const updatePackageStatus = async (id, newStatus, location, note) => {
  try {
    const packageRef = doc(db, 'packages', id);
    const packageSnap = await getDoc(packageRef);

    if (!packageSnap.exists()) {
      throw new Error("Package not found.");
    }

    const packageData = packageSnap.data();
    const currentTrackingHistory = packageData.trackingHistory || [];

    const newTrackingEntry = {
      status: newStatus,
      timestamp: new Date(),
      location: location || null,
      note: note || null,
    };

    await updateDoc(packageRef, {
      currentStatus: newStatus,
      trackingHistory: [...currentTrackingHistory, newTrackingEntry],
      updatedAt: serverTimestamp(),
    });
    console.log(`Package ${id} status updated to ${newStatus}`);
  } catch (e) {
    console.error("Error updating package status: ", e);
    throw e;
  }
};

export const searchPackageBypackageId = async (packageId) => {
  try {
    const q = query(collection(db, 'packages'), where('packageId', '==', packageId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null; // No package found with this ID
    }

    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
      // Convert Timestamps for search results too
      createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : doc.data().createdAt,
      updatedAt: doc.data().updatedAt?.toDate ? doc.data().updatedAt.toDate() : doc.data().updatedAt,
      estimatedDeliveryDate: doc.data().estimatedDeliveryDate?.toDate ? doc.data().estimatedDeliveryDate.toDate() : doc.data().estimatedDeliveryDate,
      trackingHistory: doc.data().trackingHistory?.map(entry => ({
        ...entry,
        timestamp: entry.timestamp?.toDate ? entry.timestamp.toDate() : entry.timestamp,
      })) || [],
    };
  } catch (e) {
    console.error("Error searching package by custom ID: ", e);
    throw e;
  }
};

export const getPackageById = async (id) => {
  try {
    const docRef = doc(db, 'packages', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error getting document:", e);
    throw e;
  }
};

// For pagination (if implemented later)
export const getPaginatedPackages = async (lastDoc = null, limitCount = 10) => {
  try {
    let q;
    if (lastDoc) {
      q = query(collection(db, 'packages'), orderBy('createdAt', 'desc'), startAfter(lastDoc), limit(limitCount));
    } else {
      q = query(collection(db, 'packages'), orderBy('createdAt', 'desc'), limit(limitCount));
    }
    const packageSnapshot = await getDocs(q);
    const packageList = packageSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const newLastDoc = packageSnapshot.docs[packageSnapshot.docs.length - 1];
    return { packages: packageList, lastDoc: newLastDoc };
  } catch (e) {
    console.error("Error getting paginated packages: ", e);
    throw e;
  }
};