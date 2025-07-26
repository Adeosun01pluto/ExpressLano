// // src/pages/AdminDashboardPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   createPackage,
//   getPackages,
//   updatePackage,
//   deletePackage,
//   updatePackageStatus,
//   subscribeToPackages,
//   searchPackageBypackageId
// } from '../services/packageService';
// import PackageCard from '../components/cards/PackageCard';
// import PackageFormModal from '../components/modals/PackageFormModal';
// import PackageDetailsModal from '../components/modals/PackageDetailsModal';
// import UpdateStatusModal from '../components/modals/UpdateStatusModal';
// import { LuPackagePlus, LuSearch, LuRefreshCcw } from 'react-icons/lu'; // Added icons
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { MdOutlineCancel } from "react-icons/md";
// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
// import WaybillPdfDocument from '../components/invoices/WaybillPdfDocument';
// import InvoicePdfDocument from '../components/invoices/InvoicePdfDocument ';


// function AdminDashboardPage() {
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Modal States
//   const [isFormModalOpen, setIsFormModalOpen] = useState(false);
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
//   const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);

//   // Data for Modals
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [isEditing, setIsEditing] = useState(false); // True for edit, false for create

//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState(null); // null means no search performed, [] means no results found

//   // Real-time subscription to packages
//   useEffect(() => {
//     const unsubscribe = subscribeToPackages((fetchedPackages) => {
//       setPackages(fetchedPackages);
//       setLoading(false);
//     }, (err) => {
//       console.error("Failed to subscribe to packages:", err);
//       setError("Failed to load packages in real-time. Please refresh.");
//       setLoading(false);
//     });

//     // Cleanup subscription on component unmount
//     return () => unsubscribe();
//   }, []);

//   const fetchPackagesData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await getPackages();
//       setPackages(data);
//     } catch (err) {
//       console.error("Error fetching packages:", err);
//       setError("Failed to fetch packages.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Handlers for Modals
//   const handleCreateNewPackage = () => {
//     setSelectedPackage(null);
//     setIsEditing(false);
//     setIsFormModalOpen(true);
//   };

//   const handleEditPackage = (pkg) => {
//     setSelectedPackage(pkg);
//     setIsEditing(true);
//     setIsFormModalOpen(true);
//   };

//   const handleViewDetails = (pkg) => {
//     setSelectedPackage(pkg);
//     setIsDetailsModalOpen(true);
//   };

//   const handleUpdateStatus = (pkg) => {
//     setSelectedPackage(pkg);
//     setIsUpdateStatusModalOpen(true);
//   };

//   // Main Save/Update Logic (Crucial for Invoice File)
//   const handleSavePackage = async (formData, firebaseDocId = null, invoiceFile = null) => {
//     setLoading(true);
//     setError(null);
//     try {
//       if (isEditing && firebaseDocId) {
//         // Pass firebaseDocId (pkg.id) and invoiceFile to updatePackage
//         await updatePackage(firebaseDocId, formData, invoiceFile);
//         console.log("Package updated successfully!");
//       } else {
//         // Pass invoiceFile to createPackage
//         await createPackage(formData, invoiceFile);
//         console.log("Package created successfully!");
//       }
//       setIsFormModalOpen(false);
//       setSelectedPackage(null);
//       // Data will auto-refresh due to onSnapshot subscription
//     } catch (err) {
//       console.error('Error saving package:', err);
//       setError(`Failed to save package: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeletePackage = async (packageFirebaseId) => {
//     if (window.confirm(`Are you sure you want to delete package ${packageFirebaseId}?`)) {
//       setLoading(true);
//       setError(null);
//       try {
//         await deletePackage(packageFirebaseId);
//         console.log("Package deleted successfully!");
//         // Data will auto-refresh due to onSnapshot subscription
//       } catch (err) {
//         console.error('Error deleting package:', err);
//         setError(`Failed to delete package: ${err.message}`);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleStatusUpdate = async (packageFirebaseId, newStatus, location, note) => {
//     setLoading(true);
//     setError(null);
//     try {
//       await updatePackageStatus(packageFirebaseId, newStatus, location, note);
//       console.log("Package status updated successfully!");
//       setIsUpdateStatusModalOpen(false);
//       setSelectedPackage(null);
//       // Data will auto-refresh due to onSnapshot subscription
//     } catch (err) {
//       console.error('Error updating status:', err);
//       setError(`Failed to update status: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSearchResults(null); // Reset search results
//     if (!searchTerm.trim()) {
//       setSearchResults(null); // Clear results if search term is empty
//       setLoading(false);
//       return;
//     }
//     try {
//       const result = await searchPackageBypackageId(searchTerm.trim());
//       setSearchResults(result ? [result] : []); // Store result in an array for consistent mapping
//       console.log("Search results:", result);
//     } catch (err) {
//       console.error("Error searching package:", err);
//       setError(`Failed to search: ${err.message}`);
//       setSearchResults([]); // Indicate no results on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearSearch = () => {
//     setSearchTerm('');
//     setSearchResults(null); // Clear search results display
//     // The subscription will automatically show all packages again
//   };


//   const packagesToDisplay = searchResults !== null ? searchResults : packages;

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
//       <div className="container mx-auto">
//         <h1 className="text-4xl font-extrabold text-center text-indigo-700 dark:text-indigo-400 mb-8">
//           Admin Dashboard
//         </h1>

//         {/* Action Bar */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
//           <button
//             onClick={handleCreateNewPackage}
//             className="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 w-full md:w-auto"
//           >
//             <LuPackagePlus className="mr-2 h-5 w-5" /> Create New Package
//           </button>

//           <form onSubmit={handleSearch} className="flex flex-grow max-w-lg w-full md:w-auto">
//             <input
//               type="text"
//               placeholder="Search by Package ID (e.g., PKG123ABC)"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
//             />
//             <button
//               type="submit"
//               className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-lg shadow-md transition-colors duration-300 flex items-center"
//             >
//               <LuSearch className="mr-2 h-5 w-5" /> Search
//             </button>
//             {searchResults !== null && ( // Show clear button only if search results are active
//               <button
//                 type="button"
//                 onClick={clearSearch}
//                 className="ml-2 px-4 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg shadow-md transition-colors duration-300 flex items-center"
//                 title="Clear Search"
//               >
//                 <MdOutlineCancel className="h-5 w-5" />
//               </button>
//             )}
//           </form>

//           {/* Refresh Button - useful if real-time issues or for manual sync */}
//           <button
//             onClick={fetchPackagesData}
//             className="flex items-center px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 font-semibold rounded-lg shadow-md transition-colors duration-300 w-full md:w-auto"
//           >
//             <LuRefreshCcw className="mr-2 h-5 w-5" /> Refresh Data
//           </button>
//         </div>


//         {loading && (
//           <div className="flex justify-center items-center h-48">
//             <AiOutlineLoading3Quarters className="animate-spin text-indigo-500 text-5xl" />
//             <p className="ml-3 text-lg">Loading packages...</p>
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded relative mb-4" role="alert">
//             <strong className="font-bold">Error!</strong>
//             <span className="block sm:inline ml-2">{error}</span>
//           </div>
//         )}

//         {!loading && packagesToDisplay.length === 0 && searchResults === null && (
//           <p className="text-center text-gray-500 dark:text-gray-400 text-xl mt-10">No packages found. Create one to get started!</p>
//         )}

//         {!loading && searchResults !== null && packagesToDisplay.length === 0 && (
//           <p className="text-center text-gray-500 dark:text-gray-400 text-xl mt-10">No packages found for "{searchTerm}".</p>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {packagesToDisplay.map((pkg) => (
//             <div key={pkg.id} className="">
//             {/* <PDFViewer className='w-full h-96 mb-4'>
//               <WaybillPdfDocument packageData={pkg} />
//             </PDFViewer> */}
//             {/* <PDFViewer className='w-full h-96 mb-4'>
//               <InvoicePdfDocument packageData={pkg} />
//             </PDFViewer> */}
//              {/* Example of how to add the PDFDownloadLink to PackageCard */}
//             <PackageCard
//               key={pkg.id} // Use Firestore doc.id as the key
//               packageData={pkg}
//               onViewDetails={handleViewDetails}
//               onEdit={handleEditPackage}
//               onUpdateStatus={handleUpdateStatus}
//               onDelete={handleDeletePackage}
//             />
//             <div className='flex justify-between mt-2'>

//               <PDFDownloadLink
//                 document={<InvoicePdfDocument packageData={pkg} />}
//                 fileName={`invoice_${pkg.packageId || 'N/A'}.pdf`}
//               >
//                 {({  loading }) =>
//                   loading ? 'Loading document...' : 'Download Invoice '
//                 }
//               </PDFDownloadLink>
//               <PDFDownloadLink
//                 document={<WaybillPdfDocument packageData={pkg} />}
//                 fileName={`waybill_${pkg.packageId || 'N/A'}.pdf`}
//                 >
//                 {({  loading }) =>
//                   loading ? 'Loading document...' : 'Download Waybill '
//               }
//               </PDFDownloadLink>
//             </div>
//           </div>
//           ))}
//         </div>
//       </div>

//       {/* Modals */}
//       <PackageFormModal
//         isOpen={isFormModalOpen}
//         onClose={() => setIsFormModalOpen(false)}
//         packageData={selectedPackage}
//         onSave={handleSavePackage} // This is where the invoiceFile is passed
//         isEditing={isEditing}
//       />

//       <PackageDetailsModal
//         isOpen={isDetailsModalOpen}
//         onClose={() => setIsDetailsModalOpen(false)}
//         packageData={selectedPackage}
//       />

//       <UpdateStatusModal
//         isOpen={isUpdateStatusModalOpen}
//         onClose={() => setIsUpdateStatusModalOpen(false)}
//         packageData={selectedPackage}
//         onUpdateStatus={handleStatusUpdate}
//       />
//     </div>
//   );
// }

// export default AdminDashboardPage;



// src/pages/AdminDashboardPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  createPackage,
  getPackages,
  updatePackage,
  deletePackage,
  updatePackageStatus,
  subscribeToPackages,
  searchPackageBypackageId
} from '../services/packageService';
import PackageCard from '../components/cards/PackageCard';
import PackageFormModal from '../components/modals/PackageFormModal';
import PackageDetailsModal from '../components/modals/PackageDetailsModal';
import UpdateStatusModal from '../components/modals/UpdateStatusModal';
import { LuPackagePlus, LuSearch, LuRefreshCcw, LuLogOut, LuUser, LuShield } from 'react-icons/lu'; // Added icons
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { PDFDownloadLink } from '@react-pdf/renderer';
import WaybillPdfDocument from '../components/invoices/WaybillPdfDocument';
import InvoicePdfDocument from '../components/invoices/InvoicePdfDocument ';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function AdminDashboardPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);

  // Data for Modals
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // True for edit, false for create

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null); // null means no search performed, [] means no results found

  // Authentication
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Real-time subscription to packages
  useEffect(() => {
    const unsubscribe = subscribeToPackages((fetchedPackages) => {
      setPackages(fetchedPackages);
      setLoading(false);
    }, (err) => {
      console.error("Failed to subscribe to packages:", err);
      setError("Failed to load packages in real-time. Please refresh.");
      setLoading(false);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  const fetchPackagesData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPackages();
      setPackages(data);
    } catch (err) {
      console.error("Error fetching packages:", err);
      setError("Failed to fetch packages.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Failed to log out:', error);
      setError('Failed to log out. Please try again.');
    }
  };

  // Handlers for Modals
  const handleCreateNewPackage = () => {
    setSelectedPackage(null);
    setIsEditing(false);
    setIsFormModalOpen(true);
  };

  const handleEditPackage = (pkg) => {
    setSelectedPackage(pkg);
    setIsEditing(true);
    setIsFormModalOpen(true);
  };

  const handleViewDetails = (pkg) => {
    setSelectedPackage(pkg);
    setIsDetailsModalOpen(true);
  };

  const handleUpdateStatus = (pkg) => {
    setSelectedPackage(pkg);
    setIsUpdateStatusModalOpen(true);
  };

  // Main Save/Update Logic (Crucial for Invoice File)
  const handleSavePackage = async (formData, firebaseDocId = null, invoiceFile = null) => {
    setLoading(true);
    setError(null);
    try {
      if (isEditing && firebaseDocId) {
        // Pass firebaseDocId (pkg.id) and invoiceFile to updatePackage
        await updatePackage(firebaseDocId, formData, invoiceFile);
        console.log("Package updated successfully!");
      } else {
        // Pass invoiceFile to createPackage
        await createPackage(formData, invoiceFile);
        console.log("Package created successfully!");
      }
      setIsFormModalOpen(false);
      setSelectedPackage(null);
      // Data will auto-refresh due to onSnapshot subscription
    } catch (err) {
      console.error('Error saving package:', err);
      setError(`Failed to save package: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePackage = async (packageFirebaseId) => {
    if (window.confirm(`Are you sure you want to delete package ${packageFirebaseId}?`)) {
      setLoading(true);
      setError(null);
      try {
        await deletePackage(packageFirebaseId);
        console.log("Package deleted successfully!");
        // Data will auto-refresh due to onSnapshot subscription
      } catch (err) {
        console.error('Error deleting package:', err);
        setError(`Failed to delete package: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleStatusUpdate = async (packageFirebaseId, newStatus, location, note) => {
    setLoading(true);
    setError(null);
    try {
      await updatePackageStatus(packageFirebaseId, newStatus, location, note);
      console.log("Package status updated successfully!");
      setIsUpdateStatusModalOpen(false);
      setSelectedPackage(null);
      // Data will auto-refresh due to onSnapshot subscription
    } catch (err) {
      console.error('Error updating status:', err);
      setError(`Failed to update status: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSearchResults(null); // Reset search results
    if (!searchTerm.trim()) {
      setSearchResults(null); // Clear results if search term is empty
      setLoading(false);
      return;
    }
    try {
      const result = await searchPackageBypackageId(searchTerm.trim());
      setSearchResults(result ? [result] : []); // Store result in an array for consistent mapping
      console.log("Search results:", result);
    } catch (err) {
      console.error("Error searching package:", err);
      setError(`Failed to search: ${err.message}`);
      setSearchResults([]); // Indicate no results on error
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults(null); // Clear search results display
    // The subscription will automatically show all packages again
  };

  const packagesToDisplay = searchResults !== null ? searchResults : packages;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Admin Header */}
      <div className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <LuShield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Package Management System
                </p>
              </div>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                  <LuUser className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {currentUser?.email}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">Administrator</p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                    <p className="font-medium">Signed in as</p>
                    <p className="text-gray-500 dark:text-gray-400 truncate">{currentUser?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                  >
                    <LuLogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Packages</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{packages.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <LuPackagePlus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Searches</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {searchResults !== null ? searchResults.length : 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <LuSearch className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Admin User</p>
                <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">Online</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
                <LuShield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <button
              onClick={handleCreateNewPackage}
              className="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 w-full lg:w-auto"
            >
              <LuPackagePlus className="mr-2 h-5 w-5" /> Create New Package
            </button>

            <form onSubmit={handleSearch} className="flex flex-grow max-w-2xl w-full">
              <input
                type="text"
                placeholder="Search by Package ID (e.g., PKG123ABC)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-r-lg shadow-md transition-colors duration-300 flex items-center"
              >
                <LuSearch className="mr-2 h-5 w-5" /> Search
              </button>
              {searchResults !== null && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="ml-2 px-4 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200 rounded-lg shadow-md transition-colors duration-300 flex items-center"
                  title="Clear Search"
                >
                  <MdOutlineCancel className="h-5 w-5" />
                </button>
              )}
            </form>

            <button
              onClick={fetchPackagesData}
              disabled={loading}
              className="flex items-center px-4 py-3 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 font-semibold rounded-lg shadow-md transition-colors duration-300 w-full lg:w-auto"
            >
              <LuRefreshCcw className={`mr-2 h-5 w-5 ${loading ? 'animate-spin' : ''}`} /> 
              {loading ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-48">
            <AiOutlineLoading3Quarters className="animate-spin text-indigo-500 text-5xl" />
            <p className="ml-3 text-lg">Loading packages...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

        {/* Empty States */}
        {!loading && packagesToDisplay.length === 0 && searchResults === null && (
          <div className="text-center py-12">
            <LuPackagePlus className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-xl mb-4">No packages found</p>
            <p className="text-gray-400 dark:text-gray-500 mb-6">Create your first package to get started!</p>
            <button
              onClick={handleCreateNewPackage}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300"
            >
              Create Package
            </button>
          </div>
        )}

        {!loading && searchResults !== null && packagesToDisplay.length === 0 && (
          <div className="text-center py-12">
            <LuSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-xl mb-4">No packages found</p>
            <p className="text-gray-400 dark:text-gray-500 mb-6">No packages match "{searchTerm}"</p>
            <button
              onClick={clearSearch}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Package Grid */}
        {!loading && packagesToDisplay.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packagesToDisplay.map((pkg) => (
              <div key={pkg.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                <PackageCard
                  packageData={pkg}
                  onViewDetails={handleViewDetails}
                  onEdit={handleEditPackage}
                  onUpdateStatus={handleUpdateStatus}
                  onDelete={handleDeletePackage}
                />
                <div className='flex justify-between p-4 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700'>
                  <PDFDownloadLink
                    document={<InvoicePdfDocument packageData={pkg} />}
                    fileName={`invoice_${pkg.packageId || 'N/A'}.pdf`}
                    className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors duration-200"
                  >
                    {({ loading }) =>
                      loading ? 'Loading...' : 'Download Invoice'
                    }
                  </PDFDownloadLink>
                  <PDFDownloadLink
                    document={<WaybillPdfDocument packageData={pkg} />}
                    fileName={`waybill_${pkg.packageId || 'N/A'}.pdf`}
                    className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors duration-200"
                  >
                    {({ loading }) =>
                      loading ? 'Loading...' : 'Download Waybill'
                    }
                  </PDFDownloadLink>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        ></div>
      )}

      {/* Modals */}
      <PackageFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        packageData={selectedPackage}
        onSave={handleSavePackage}
        isEditing={isEditing}
      />

      <PackageDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        packageData={selectedPackage}
      />

      <UpdateStatusModal
        isOpen={isUpdateStatusModalOpen}
        onClose={() => setIsUpdateStatusModalOpen(false)}
        packageData={selectedPackage}
        onUpdateStatus={handleStatusUpdate}
      />
    </div>
  );
}

export default AdminDashboardPage;