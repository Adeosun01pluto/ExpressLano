import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Import necessary icons
import { LuSearch, LuUser, LuPackage, LuMapPin, LuTruck, LuPhone, LuMail, LuFileText, LuCalendar, LuWeight, LuRuler } from 'react-icons/lu';
import { CiHome, CiCircleCheck } from "react-icons/ci";
import { MdOutlineCancel, MdOutlineWarning, MdOutlinePause } from "react-icons/md";
import { FiPackage, FiTruck, FiMapPin, FiCheckCircle } from "react-icons/fi";

// NEW: Import Firestore database instance and query functions
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import WaybillPdfDocument from '../components/invoices/WaybillPdfDocument';
import InvoicePdfDocument from '../components/invoices/InvoicePdfDocument ';

function ConsignmentPage() {
  const [packageIdInput, setPackageIdInput] = useState('');
  const [packageData, setPackageData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
    // Function to format date/time
  const formatDate = (date) => {
    if (!date) return 'N/A';
    // Ensure it's a Date object before formatting
    const jsDate = date instanceof Date ? date : (date.toDate ? date.toDate() : new Date(date));
    return jsDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };
  const statusOptions = [
    'Order Placed',
    'In Transit',
    'Out for Delivery',
    'Delivered',
    'On Hold',
    'Exception',
    'Returned',
    'Canceled',
  ];

  // Function to calculate progress based on status with gradual increase
  const calculateProgress = (status) => {
    const statusIndex = statusOptions.findIndex(s => s === status);
    if (statusIndex === -1) return 0;
    
    // Calculate progress as percentage with gradual steps
    const totalSteps = statusOptions.length - 1;
    const progressPerStep = 100 / totalSteps;
    return Math.round(statusIndex * progressPerStep);
  };

  // Function to get appropriate icon for status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Order Placed':
        return <FiPackage className="w-full h-full" />;
      case 'In Transit':
        return <FiTruck className="w-full h-full" />;
      case 'Out for Delivery':
        return <LuTruck className="w-full h-full" />;
      case 'Delivered':
        return <FiCheckCircle className="w-full h-full" />;
      case 'On Hold':
        return <MdOutlinePause className="w-full h-full" />;
      case 'Exception':
        return <MdOutlineWarning className="w-full h-full" />;
      case 'Returned':
      case 'Canceled':
        return <MdOutlineCancel className="w-full h-full" />;
      default:
        return <FiMapPin className="w-full h-full" />;
    }
  };

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Order Placed':
        return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'In Transit':
        return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'Out for Delivery':
        return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'Delivered':
        return 'bg-green-100 text-green-600 border-green-200';
      case 'On Hold':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'Exception':
        return 'bg-red-100 text-red-600 border-red-200';
      case 'Returned':
      case 'Canceled':
        return 'bg-red-100 text-red-600 border-red-200';
      default:
        return 'bg-indigo-100 text-indigo-600 border-indigo-200';
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setPackageData(null); // Clear previous data
    setIsLoading(true);

    const trimmedId = packageIdInput.trim().toUpperCase(); // Normalize ID for search

    if (!trimmedId) {
      setError('Please enter a Consignment ID (Package ID).');
      setIsLoading(false);
      return;
    }

    try {
      const packagesRef = collection(db, 'packages');
      const q = query(packagesRef, where('packageId', '==', trimmedId));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        const data = docSnap.data();

        // Ensure trackingHistory exists and map over it
        const processedHistory = data.trackingHistory?.map(event => ({
          ...event,
          icon: getStatusIcon(event.status)
        })) || []; // Initialize as empty array if not present

        // Calculate progress dynamically
        const progress = calculateProgress(data.currentStatus);

        setPackageData({
          ...data,
          trackingHistory: processedHistory,
          id: docSnap.id,
          progress: progress // Add calculated progress to packageData
        });
      } else {
        setError(`Consignment ID "${trimmedId}" not found. Please check the ID and try again.`);
      }
    } catch (err) {
      console.error("Error fetching consignment: ", err);
      setError('Failed to fetch consignment data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container min-h-[80vh] mx-auto px-4 py-8 md:py-12 lg:py-16">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white text-center mb-8 md:mb-10 lg:mb-12"
      >
        Track Consignment
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-4 md:p-6 lg:p-8 rounded-xl shadow-lg dark:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
      >
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6">
          <input
            type="text"
            value={packageIdInput}
            onChange={(e) => setPackageIdInput(e.target.value)}
            placeholder="Enter Consignment/Package ID (e.g., F54DD654-E6C)"
            className="flex-grow p-3 md:p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors duration-200 text-base md:text-lg uppercase"
            required
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center px-4 md:px-6 py-3 md:py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 text-base md:text-lg whitespace-nowrap"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-2 md:mr-3 h-4 md:h-5 w-4 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <LuSearch className="h-4 md:h-5 w-4 md:w-5 mr-2" />
            )}
            {isLoading ? 'Searching...' : 'Search'}
          </motion.button>
        </form>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 dark:text-red-400 mt-4 text-center text-sm md:text-base"
          >
            {error}
          </motion.p>
        )}

        {packageData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 md:mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 md:pt-8"
          >
            <h3 className="text-md md:text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Consignment Details: <span className="text-indigo-600 dark:text-indigo-400 break-all">{packageData.packageId}</span>
            </h3>

            {/* Current Status with Enhanced Progress Bar */}
            <div className="mb-6 md:mb-8 p-4 md:p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <h4 className="text-lg md:text-xl font-medium text-gray-900 dark:text-white">
                  Current Status:
                </h4>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm md:text-base font-medium border ${getStatusColor(packageData.currentStatus)}`}>
                  <div className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0">
                    {getStatusIcon(packageData.currentStatus)}
                  </div>
                  {packageData.currentStatus}
                </div>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 md:h-4 mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${packageData.progress || 0}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-full"
                  style={{ width: `${packageData.progress || 0}%` }}
                ></motion.div>
              </div>
              <p className="text-right text-sm md:text-base text-gray-600 dark:text-gray-400">{packageData.progress || 0}% Complete</p>
            </div>

            {/* Enhanced Sender & Receiver Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              {(packageData.senderName || packageData.senderAddress || packageData.senderPhone || packageData.senderEmail) && (
                <div className="p-4 md:p-5 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                  <h4 className="flex items-center text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    <div className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                      <LuUser className="w-full h-full" />
                    </div>
                    Sender Information
                  </h4>
                  <div className="space-y-2">
                    {packageData.senderName && (
                      <p className="text-gray-700 items-center dark:text-gray-300 flex text-sm md:text-base">
                        <div className="w-4 h-4 mr-2 mt-0.5 opacity-70 flex-shrink-0">
                          <LuUser className="w-full h-full" />
                        </div>
                        <span className="break-words">{packageData.senderName}</span>
                      </p>
                    )}
                    {packageData.senderAddress && (
                      <p className="text-gray-700 dark:text-gray-300 flex items-start text-sm md:text-base">
                        <div className="w-4 h-4 mr-2 mt-0.5 opacity-70 flex-shrink-0">
                          <CiHome className="w-full h-full" />
                        </div>
                        <span className="break-words">{packageData.senderAddress}</span>
                      </p>
                    )}
                    {packageData.senderPhone && (
                      <p className="text-gray-700 dark:text-gray-300 flex items-center text-sm md:text-base">
                        <div className="w-4 h-4 mr-2 mt-0.5 opacity-70 flex-shrink-0">
                          <LuPhone className="w-full h-full" />
                        </div>
                        <span className="break-words">{packageData.senderPhone}</span>
                      </p>
                    )}
                    {packageData.senderEmail && (
                      <p className="text-gray-700 dark:text-gray-300 flex items-center text-sm md:text-base">
                        <div className="w-4 h-4 mr-2 mt-0.5 opacity-70 flex-shrink-0">
                          <LuMail className="w-full h-full" />
                        </div>
                        <span className="break-words">{packageData.senderEmail}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              {(packageData.receiverName || packageData.receiverAddress || packageData.receiverPhone || packageData.receiverEmail) && (
                <div className="p-4 md:p-5 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                  <h4 className="flex items-center text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    <div className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                      <LuUser className="w-full h-full" />
                    </div>
                    Receiver Information
                  </h4>
                  <div className="space-y-2">
                    {packageData.receiverName && (
                      <p className="text-gray-700 dark:text-gray-300 flex items-center text-sm md:text-base">
                        <div className="w-4 h-4 mr-2 mt-0.5 opacity-70 flex-shrink-0">
                          <LuUser className="w-full h-full" />
                        </div>
                        <span className="break-words">{packageData.receiverName}</span>
                      </p>
                    )}
                    {packageData.receiverAddress && (
                      <p className="text-gray-700 dark:text-gray-300 flex items-start text-sm md:text-base">
                        <div className="w-4 h-4 mr-2 mt-0.5 opacity-70 flex-shrink-0">
                          <CiHome className="w-full h-full" />
                        </div>
                        <span className="break-words">{packageData.receiverAddress}</span>
                      </p>
                    )}
                    {packageData.receiverPhone && (
                      <p className="text-gray-700 dark:text-gray-300 flex items-center text-sm md:text-base">
                        <div className="w-4 h-4 mr-2 mt-0.5 opacity-70 flex-shrink-0">
                          <LuPhone className="w-full h-full" />
                        </div>
                        <span className="break-words">{packageData.receiverPhone}</span>
                      </p>
                    )}
                    {packageData.receiverEmail && (
                      <p className="text-gray-700 dark:text-gray-300 flex items-center text-sm md:text-base">
                        <div className="w-4 h-4 mr-2 mt-0.5 opacity-70 flex-shrink-0">
                          <LuMail className="w-full h-full" />
                        </div>
                        <span className="break-words">{packageData.receiverEmail}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Package Details with Shipment Type */}
            <div className="p-4 md:p-5 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 mb-6 md:mb-8">
              <h4 className="flex items-center text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                <div className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                  <LuPackage className="w-full h-full" />
                </div>
                Package Details
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                {packageData.itemDetails?.itemName && (
                  <div className="flex items-start">
                    <strong className="text-gray-900 dark:text-white mr-2 flex-shrink-0">Item Name:</strong>
                    <span className="text-gray-700 dark:text-gray-300 break-words">{packageData.itemDetails.itemName}</span>
                  </div>
                )}
                
                {packageData.typeOfShipment && (
                  <div className="flex items-start">
                    <strong className="text-gray-900 dark:text-white mr-2 flex-shrink-0">Shipment Type:</strong>
                    <span className="text-gray-700 dark:text-gray-300 break-words">{packageData.typeOfShipment}</span>
                  </div>
                )}
                
                {packageData.weight && (
                  <div className="flex items-start">
                    <strong className="text-gray-900 dark:text-white mr-2 flex-shrink-0">Weight:</strong>
                    <span className="text-gray-700 dark:text-gray-300">{packageData.weight} kg</span>
                  </div>
                )}
                
                {packageData.dimensions && (
                  <div className="flex items-start">
                    <strong className="text-gray-900 dark:text-white mr-2 flex-shrink-0">Dimensions:</strong>
                    <span className="text-gray-700 dark:text-gray-300 break-words">{packageData.dimensions}</span>
                  </div>
                )}
                
                {packageData.packageType && (
                  <div className="flex items-start">
                    <strong className="text-gray-900 dark:text-white mr-2 flex-shrink-0">Package Type:</strong>
                    <span className="text-gray-700 dark:text-gray-300">{packageData.packageType}</span>
                  </div>
                )}
                
                {packageData.courier && (
                  <div className="flex items-start">
                    <strong className="text-gray-900 dark:text-white mr-2 flex-shrink-0">Courier:</strong>
                    <span className="text-gray-700 dark:text-gray-300">{packageData.courier}</span>
                  </div>
                )}
                
                {packageData.origin && (
                  <div className="flex items-start">
                    <strong className="text-gray-900 dark:text-white mr-2 flex-shrink-0">Origin:</strong>
                    <span className="text-gray-700 dark:text-gray-300 break-words">{packageData.origin}</span>
                  </div>
                )}
                
                {packageData.destination && (
                  <div className="flex items-start">
                    <strong className="text-gray-900 dark:text-white mr-2 flex-shrink-0">Destination:</strong>
                    <span className="text-gray-700 dark:text-gray-300 break-words">{packageData.destination}</span>
                  </div>
                )}
              </div>
              
              {packageData.itemDetails?.description && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <strong className="text-gray-900 dark:text-white block mb-2">Description:</strong>
                  <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
                    {packageData.itemDetails.description}
                  </p>
                </div>
              )}
            </div>

            {/* Invoice Section */}
            <div className="p-4 md:p-5 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 mb-6 md:mb-8">
              <h4 className="flex items-center text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                <div className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                  <LuFileText className="w-full h-full" />
                </div>
                Documents
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm md:text-base">
                Download your shipping documents:
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <PDFDownloadLink
                  className='inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 text-sm md:text-base'
                  document={<InvoicePdfDocument packageData={packageData} />}
                  fileName={`invoice_${packageData.packageId || 'N/A'}.pdf`}
                >
                  {({ loading }) =>
                    loading ? 'Loading...' : 'Download Invoice'
                  }
                </PDFDownloadLink>
                <PDFDownloadLink
                  className='inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 text-sm md:text-base'
                  document={<WaybillPdfDocument packageData={packageData} />}
                  fileName={`waybill_${packageData.packageId || 'N/A'}.pdf`}
                >
                  {({ loading }) =>
                    loading ? 'Loading...' : 'Download Waybill'
                  }
                </PDFDownloadLink>
              </div>
            </div>

            {/* Enhanced Status History */}
            {packageData.trackingHistory && packageData.trackingHistory.length > 0 && (
              <>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                  Tracking History
                </h3>
                <div className="relative pl-6 md:pl-8">
                  <div className="absolute left-3 md:left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  {packageData.trackingHistory.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="mb-4 md:mb-4 flex items-start last:mb-0 relative"
                    >
                      <div className={`absolute left-0 md:left-2 flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full ${getStatusColor(event.status)} z-10 -translate-x-1/2 mt-0.5 shadow-md border-2 border-white dark:border-gray-800`}>
                        <div className="w-4 h-4 md:w-5 md:h-5">
                          {event.icon || getStatusIcon(event.status)}
                        </div>
                      </div>
                      <div className="ml-6 md:ml-8 w-full p-4 md:p-5 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1 sm:gap-2">
                          <p className="text-base md:text-lg font-medium text-gray-900 dark:text-white">{event.status}</p>
                          {event.timestamp && (
                            <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm flex items-center">
                              <div className="w-3 h-3 md:w-4 md:h-4 mr-1 flex-shrink-0">
                                <LuCalendar className="w-full h-full" />
                              </div>
                              {formatDate(event.timestamp)}
                            </p>
                          )}
                        </div>
                        {event.location && (
                          <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base flex items-center">
                            <div className="w-4 h-4 mr-2 mt-0.5 text-gray-500 dark:text-gray-400 flex-shrink-0">
                              <LuMapPin className="w-full h-full" />
                            </div>
                            <span className="break-words">{event.location}</span>
                          </p>
                        )}
                        {event.note && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mt-2 pl-6 italic break-words">
                            "{event.note}"
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default ConsignmentPage;