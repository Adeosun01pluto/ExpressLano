// components/modals/UpdateStatusModal.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoXCircle } from 'react-icons/go';
import { LuTruck, LuMapPin, LuClipboardPen } from 'react-icons/lu'; // Added icons
import LoadingSpinner from '../LoadingSpinner';

function UpdateStatusModal({ isOpen, onClose, packageData, onUpdateStatus, isLoading, setLoading }) {
  const [newStatus, setNewStatus] = useState('');
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState(null);

  // Reset form fields when modal opens or packageData changes
  useEffect(() => {
    if (isOpen && packageData) {
      setNewStatus(packageData.currentStatus || 'Order Placed'); // Pre-fill with current status
      setLocation(''); // Always clear location and note for new entry
      setNote('');
      setError(null);
    } else if (!isOpen) {
      // Clear fields when modal closes
      setNewStatus('');
      setLocation('');
      setNote('');
      setError(null);
    }
  }, [isOpen, packageData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    if (!newStatus) {
      setError('Please select a new status.');
      return;
    }
    if (!packageData || !packageData.id) {
      setError('Package data is missing. Cannot update status.');
      return;
    }

    try {
      // Call the onUpdateStatus function passed from AdminDashboardPage
      await onUpdateStatus(packageData.id, newStatus, location, note);
      onClose(); // Close modal on successful update
    } catch (err) {
      console.error('Error updating status in modal:', err);
      setError(`Failed to update status: ${err.message}`);
    }
  };

  if (!isOpen) return null;

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              aria-label="Close modal"
            >
              <GoXCircle />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <LuTruck className="mr-2 h-6 w-6 text-indigo-600 dark:text-indigo-400" /> Update Package Status
            </h2>

            {packageData && (
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                <strong className="text-gray-900 dark:text-white">Package:</strong> {packageData.packageId} - {packageData.itemDetails?.mainItemName || packageData.itemDetails?.mainItemDescription || 'N/A'}
              </p>
            )}

            {error && (
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline ml-2">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="newStatus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <LuTruck className="mr-2" /> New Status <span className="text-red-500">*</span>
                </label>
                <select
                  id="newStatus"
                  name="newStatus"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                  <option value="">Select Status</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <LuMapPin className="mr-2" /> Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Warehouse A, New York"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>

              <div>
                <label htmlFor="note" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <LuClipboardPen className="mr-2" /> Note
                </label>
                <textarea
                  id="note"
                  name="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows="3"
                  placeholder="Any additional details about this status update..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                {isLoading ? <LoadingSpinner /> : 
                  <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Update Status
                  </button>
                }
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default UpdateStatusModal;