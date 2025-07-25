// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { LuSearch, LuPackage, LuMapPin } from 'react-icons/lu'; // React Icons for search, checkmark, package, and location
// import { FaCircleCheck } from "react-icons/fa6";

// // Mock Data for demonstration
// const mockTrackingData = {
//   '123456789': [
//     { status: 'Order Placed', date: '2025-07-15 10:00 AM', location: 'Online Store', icon: <LuPackage className="h-4 w-4" /> },
//     { status: 'Processing at Hub', date: '2025-07-15 03:30 PM', location: 'Warehouse, Berlin, Germany', icon: <LuPackage className="h-4 w-4" /> },
//     { status: 'Shipped from Origin', date: '2025-07-16 09:00 AM', location: 'Berlin, Germany', icon: <LuPackage className="h-4 w-4" /> },
//     { status: 'In Transit', date: '2025-07-17 06:00 AM', location: 'Leipzig, Germany', icon: <LuMapPin className="h-4 w-4" /> },
//     { status: 'Arrived at Destination Hub', date: '2025-07-18 02:00 PM', location: 'Zürich, Switzerland', icon: <LuMapPin className="h-4 w-4" /> },
//     { status: 'Out for Delivery', date: '2025-07-18 09:00 AM', location: 'Zürich, Switzerland', icon: <LuPackage className="h-4 w-4" /> },
//     { status: 'Delivered', date: '2025-07-18 03:00 PM', location: 'Zürich, Switzerland', icon: <FaCircleCheck className="h-4 w-4" /> },
//   ],
//   'ABC987654': [
//     { status: 'Order Placed', date: '2025-07-16 11:00 AM', location: 'E-commerce Site', icon: <LuPackage className="h-4 w-4" /> },
//     { status: 'Processing', date: '2025-07-16 04:00 PM', location: 'Fulfillment Center, Paris, France', icon: <LuPackage className="h-4 w-4" /> },
//     { status: 'Shipped', date: '2025-07-17 10:00 AM', location: 'Paris, France', icon: <LuPackage className="h-4 w-4" /> },
//     { status: 'In Transit', date: '2025-07-18 08:00 AM', location: 'Brussels, Belgium', icon: <LuMapPin className="h-4 w-4" /> },
//   ],
// };

// function TrackPackagePage() {
//   const [trackingNumber, setTrackingNumber] = useState('');
//   const [trackingInfo, setTrackingInfo] = useState(null);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false); // New state for loading indicator

//   const handleTrack = async (e) => { // Made async for potential future API calls
//     e.preventDefault();
//     setError('');
//     setTrackingInfo(null);
//     setIsLoading(true); // Start loading

//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     const data = mockTrackingData[trackingNumber.trim()];
//     if (data) {
//       setTrackingInfo(data);
//     } else {
//       setError('Tracking number not found or invalid. Please try 123456789 or ABC987654.');
//     }
//     setIsLoading(false); // End loading
//   };

//   return (
//     <div className="container mx-auto px-4 py-12 md:py-16">
//       <motion.h2
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white text-center mb-10 md:mb-12"
//       >
//         Track Your Package
//       </motion.h2>

//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, delay: 0.2 }}
//         className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
//       >
//         <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
//           <input
//             type="text"
//             value={trackingNumber}
//             onChange={(e) => setTrackingNumber(e.target.value)}
//             placeholder="Enter tracking number (e.g., 123456789)"
//             className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors duration-200 text-lg"
//             required
//           />
//           <motion.button
//             type="submit"
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//             className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 text-lg"
//             disabled={isLoading} // Disable button when loading
//           >
//             {isLoading ? (
//               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//             ) : (
//               <LuSearch className="h-5 w-5 mr-2" />
//             )}
//             {isLoading ? 'Tracking...' : 'Track'}
//           </motion.button>
//         </form>

//         {error && (
//           <motion.p
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-red-500 dark:text-red-400 mt-4 text-center text-sm"
//           >
//             {error}
//           </motion.p>
//         )}

//         {trackingInfo && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.3 }}
//             className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8"
//           >
//             <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
//               Tracking History for <span className="text-indigo-600 dark:text-indigo-400">{trackingNumber}</span>
//             </h3>
//             <div className="relative pl-4 sm:pl-8">
//               {/* Vertical line for timeline */}
//               <div className="absolute left-2 sm:left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>

//               {trackingInfo.map((event, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   className="mb-8 flex items-start last:mb-0 relative"
//                 >
//                   {/* Circle marker with icon */}
//                   <div className="absolute left-0 sm:left-2 flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 z-10 -translate-x-1/2 mt-0.5 shadow-md border border-indigo-200 dark:border-gray-600">
//                     {event.icon}
//                   </div>
//                   <div className="ml-8 w-full p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
//                     <p className="text-lg font-medium text-gray-900 dark:text-white mb-1">{event.status}</p>
//                     <p className="text-gray-600 dark:text-gray-400 text-sm">{event.date}</p>
//                     <p className="text-gray-700 dark:text-gray-300 text-sm mt-1 flex items-center">
//                       <LuMapPin className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
//                       {event.location}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </motion.div>
//     </div>
//   );
// }

// export default TrackPackagePage;




import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Import necessary icons
import { LuSearch, LuPackage, LuMapPin, LuTruck } from 'react-icons/lu';
import { FaCircleCheck } from "react-icons/fa6"; // Assuming this is for delivered status
import { CiCircleCheck } from "react-icons/ci"; // Using this one as well for Delivered status

// Import Firestore database instance and query functions
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function TrackPackagePage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [packageData, setPackageData] = useState(null); // Renamed from trackingInfo to packageData for clarity
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setError('');
    setPackageData(null); // Clear previous data
    setIsLoading(true);

    const trimmedTrackingNumber = trackingNumber.trim().toUpperCase(); // Normalize ID for search

    if (!trimmedTrackingNumber) {
      setError('Please enter a tracking number.');
      setIsLoading(false);
      return;
    }

    try {
      // Create a query against the 'packages' collection
      // IMPORTANT: Changed 'id' to 'packageId' to match your data structure
      const packagesRef = collection(db, 'packages');
      const q = query(packagesRef, where('packageId', '==', trimmedTrackingNumber));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0]; // Get the first (and ideally only) matching document
        const data = docSnap.data();

        // Process trackingHistory to assign icons dynamically
        // IMPORTANT: Changed 'statusHistory' to 'trackingHistory'
        const processedHistory = data.trackingHistory?.map(event => ({
          ...event,
          // Assign icons based on status text
          icon: event.icon || ( // Prioritize icon if it exists in data, otherwise assign based on status
            event.status === 'Delivered' ? <CiCircleCheck className="h-4 w-4" /> : // Using CiCircleCheck for consistency
            event.status.includes('Out for Delivery') || event.status.includes('Shipped') || event.status.includes('In Transit') ? <LuTruck className="h-4 w-4" /> :
            event.status.includes('Hub') || event.status.includes('Arrived') ? <LuMapPin className="h-4 w-4" /> :
            <LuPackage className="h-4 w-4" /> // Generic fallback icon
          )
        })) || []; // Ensure it's an array even if trackingHistory is undefined

        // Set the package data, including the processed history
        setPackageData({ ...data, trackingHistory: processedHistory, id: docSnap.id }); // docSnap.id is the Firestore document ID, data.packageId is your custom one
      } else {
        setError(`Tracking number "${trimmedTrackingNumber}" not found. Please check the number and try again.`);
      }
    } catch (err) {
      console.error("Error fetching package: ", err);
      setError('Failed to fetch tracking data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white text-center mb-10 md:mb-12"
      >
        Track Your Package
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
      >
        <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter tracking number (e.g., F54DD654-E6C)"
            className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors duration-200 text-lg uppercase"
            required
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 text-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <LuSearch className="h-5 w-5 mr-2" />
            )}
            {isLoading ? 'Tracking...' : 'Track'}
          </motion.button>
        </form>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 dark:text-red-400 mt-4 text-center text-sm"
          >
            {error}
          </motion.p>
        )}

        {packageData && ( // Changed from trackingInfo to packageData
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8"
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Tracking History for <span className="text-indigo-600 dark:text-indigo-400">{packageData.packageId}</span>
            </h3>
            {/* Display key package details for context */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                <div><strong>Current Status:</strong> <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{packageData.currentStatus}</span></div>
                <div><strong>Origin:</strong> {packageData.origin}</div>
                <div><strong>Destination:</strong> {packageData.destination}</div>
                <div><strong>Item:</strong> {packageData.itemDetails?.itemName || 'N/A'}</div>
            </div>


            <div className="relative pl-4 sm:pl-8">
              {/* Vertical line for timeline */}
              <div className="absolute left-2 sm:left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>

              {/* IMPORTANT: Changed trackingInfo.statusHistory to packageData.trackingHistory */}
              {packageData.trackingHistory?.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-8 flex items-start last:mb-0 relative"
                >
                  {/* Circle marker with icon */}
                  <div className="absolute left-0 sm:left-2 flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 z-10 -translate-x-1/2 mt-0.5 shadow-md border border-indigo-200 dark:border-gray-600">
                    {event.icon}
                  </div>
                  <div className="ml-8 w-full p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                    <p className="text-lg font-medium text-gray-900 dark:text-white mb-1">{event.status}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{event.date}</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mt-1 flex items-center">
                      <LuMapPin className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      {event.location}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default TrackPackagePage;