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
import { LuPackagePlus, LuSearch, LuRefreshCcw } from 'react-icons/lu'; // Added icons
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import WaybillPdfDocument from '../components/invoices/WaybillPdfDocument';
import InvoicePdfDocument from '../components/invoices/InvoicePdfDocument ';


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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 dark:text-indigo-400 mb-8">
          Admin Dashboard
        </h1>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <button
            onClick={handleCreateNewPackage}
            className="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 w-full md:w-auto"
          >
            <LuPackagePlus className="mr-2 h-5 w-5" /> Create New Package
          </button>

          <form onSubmit={handleSearch} className="flex flex-grow max-w-lg w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by Package ID (e.g., PKG123ABC)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-lg shadow-md transition-colors duration-300 flex items-center"
            >
              <LuSearch className="mr-2 h-5 w-5" /> Search
            </button>
            {searchResults !== null && ( // Show clear button only if search results are active
              <button
                type="button"
                onClick={clearSearch}
                className="ml-2 px-4 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg shadow-md transition-colors duration-300 flex items-center"
                title="Clear Search"
              >
                <MdOutlineCancel className="h-5 w-5" />
              </button>
            )}
          </form>

          {/* Refresh Button - useful if real-time issues or for manual sync */}
          <button
            onClick={fetchPackagesData}
            className="flex items-center px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 font-semibold rounded-lg shadow-md transition-colors duration-300 w-full md:w-auto"
          >
            <LuRefreshCcw className="mr-2 h-5 w-5" /> Refresh Data
          </button>
        </div>


        {loading && (
          <div className="flex justify-center items-center h-48">
            <AiOutlineLoading3Quarters className="animate-spin text-indigo-500 text-5xl" />
            <p className="ml-3 text-lg">Loading packages...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

        {!loading && packagesToDisplay.length === 0 && searchResults === null && (
          <p className="text-center text-gray-500 dark:text-gray-400 text-xl mt-10">No packages found. Create one to get started!</p>
        )}

        {!loading && searchResults !== null && packagesToDisplay.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 text-xl mt-10">No packages found for "{searchTerm}".</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packagesToDisplay.map((pkg) => (
            <div key={pkg.id} className="">
            {/* <PDFViewer className='w-full h-96 mb-4'>
              <WaybillPdfDocument packageData={pkg} />
            </PDFViewer> */}
            {/* <PDFViewer className='w-full h-96 mb-4'>
              <InvoicePdfDocument packageData={pkg} />
            </PDFViewer> */}
             {/* Example of how to add the PDFDownloadLink to PackageCard */}
            <PackageCard
              key={pkg.id} // Use Firestore doc.id as the key
              packageData={pkg}
              onViewDetails={handleViewDetails}
              onEdit={handleEditPackage}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDeletePackage}
            />
            <div className='flex justify-between mt-2'>

              <PDFDownloadLink
                document={<InvoicePdfDocument packageData={pkg} />}
                fileName={`invoice_${pkg.packageId || 'N/A'}.pdf`}
              >
                {({  loading }) =>
                  loading ? 'Loading document...' : 'Download Invoice '
                }
              </PDFDownloadLink>
              <PDFDownloadLink
                document={<WaybillPdfDocument packageData={pkg} />}
                fileName={`waybill_${pkg.packageId || 'N/A'}.pdf`}
                >
                {({  loading }) =>
                  loading ? 'Loading document...' : 'Download Waybill '
              }
              </PDFDownloadLink>
            </div>
          </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <PackageFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        packageData={selectedPackage}
        onSave={handleSavePackage} // This is where the invoiceFile is passed
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