
// components/modals/PackageDetailsModal.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { GoXCircle } from "react-icons/go";
import {
    LuPackage, LuMapPin, LuCalendar, LuClipboardList,
    LuFileText, LuDownload, LuExternalLink, LuEye, // LuExternalLink and LuEye are now unused after removal
    LuPlane, LuShip, LuGlobe, LuCreditCard, LuClock, LuBox,
    LuTruck
} from 'react-icons/lu';
import { FaShippingFast } from 'react-icons/fa';

// PDFPreviewModal component is entirely removed from this file.

function PackageDetailsModal({ isOpen, onClose, packageData }) {
    // Removed showInvoicePdfPreview and showWaybillPdfPreview states as they are no longer needed.

    if (!isOpen || !packageData) return null;

    // Function to format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });
        } catch (error) {
            console.error("Error formatting date:", dateString, error);
            return dateString; // Return original string if it can't be formatted
        }
    };

    // Function to format time (for departureTime, pickupTime)
    const formatTime = (timeString) => {
        if (!timeString) return 'N/A';
        // Assuming timeString is in HH:MM format
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    // Removed handlePreviewInvoicePdf, downloadInvoicePdfDirect, handlePreviewWaybillPdf, downloadWaybillPdfDirect
    // as their functionality is being removed.

    // Helper to calculate total volumetric weight (example: L*W*H / 5000 for air freight)
    const calculateTotalVolumetricWeight = () => {
        return packageData.packageItems?.reduce((total, item) => {
            const length = parseFloat(item.lengthCm) || 0;
            const width = parseFloat(item.widthCm) || 0;
            const height = parseFloat(item.heightCm) || 0;
            // Common volumetric weight calculation factor for international air freight
            const volumetricWeight = (length * width * height) / 5000;
            return total + volumetricWeight;
        }, 0).toFixed(2);
    };

    // Helper to calculate total actual weight
    const calculateTotalActualWeight = () => {
        return packageData.packageItems?.reduce((total, item) => {
            const weight = parseFloat(item.weightKg) || 0;
            return total + weight;
        }, 0).toFixed(2);
    };

    return (
        <>
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
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                                aria-label="Close modal"
                            >
                                <GoXCircle />
                            </button>

                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <LuPackage className="mr-2 h-7 w-7 text-indigo-600 dark:text-indigo-400" /> Package Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-gray-700 dark:text-gray-300 mb-6">
                                {/* Basic Info */}
                                <div className="col-span-full border-b pb-4 mb-4 border-gray-200 dark:border-gray-700">
                                    <p><strong className="text-gray-900 dark:text-white">Package ID:</strong> {packageData.packageId || 'N/A'}</p>
                                    <p><strong className="text-gray-900 dark:text-white">Firestore ID:</strong> {packageData.id || 'N/A'}</p>
                                    <p><strong className="text-gray-900 dark:text-white">Current Status:</strong> <span className={`font-semibold ${
                                        packageData.currentStatus === 'Delivered' ? 'text-green-600' :
                                        packageData.currentStatus === 'Exception' || packageData.currentStatus === 'On Hold' ? 'text-red-600' :
                                        'text-indigo-600'
                                    }`}>{packageData.currentStatus || 'N/A'}</span></p>
                                    <p><strong className="text-gray-900 dark:text-white">Last Updated:</strong> {formatDate(packageData.updatedAt)}</p>
                                    <p><strong className="text-gray-900 dark:text-white">Created At:</strong> {formatDate(packageData.createdAt)}</p>
                                </div>

                                {/* Sender/Receiver */}
                                <div>
                                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 flex items-center">
                                        <LuMapPin className="mr-2 h-5 w-5 text-indigo-500" /> Sender Information
                                    </h4>
                                    <p><strong>Name:</strong> {packageData.senderName || 'N/A'}</p>
                                    <p><strong>Address:</strong> {packageData.senderAddress || 'N/A'}</p>
                                    <p><strong>Email:</strong> {packageData.senderEmail || 'N/A'}</p>
                                    <p><strong>Phone:</strong> {packageData.senderPhone || 'N/A'}</p>
                                    <p><strong>Origin:</strong> {packageData.origin || 'N/A'}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 flex items-center">
                                        <LuMapPin className="mr-2 h-5 w-5 text-indigo-500" /> Receiver Information
                                    </h4>
                                    <p><strong>Name:</strong> {packageData.receiverName || 'N/A'}</p>
                                    <p><strong>Address:</strong> {packageData.receiverAddress || 'N/A'}</p>
                                    <p><strong>Email:</strong> {packageData.receiverEmail || 'N/A'}</p>
                                    <p><strong>Phone:</strong> {packageData.receiverPhone || 'N/A'}</p>
                                    <p><strong>Destination:</strong> {packageData.destination || 'N/A'}</p>
                                </div>

                                {/* Shipment Details - New fields */}
                                <div className="md:col-span-2 mt-4 border-t pt-4 border-gray-200 dark:border-gray-700">
                                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 flex items-center">
                                        <LuTruck className="mr-2 h-5 w-5 text-indigo-500" /> Shipment Specifics
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                                        <p><strong>Type of Shipment:</strong> {packageData.typeOfShipment || 'N/A'}</p>
                                        <p><strong>Courier:</strong> {packageData.courier || 'N/A'}</p>
                                        <p><strong>Payment Mode:</strong> {packageData.paymentMode || 'N/A'}</p>
                                        <p><strong>Product:</strong> {packageData.product || 'N/A'}</p>
                                        <p><strong>Quantity (Overall):</strong> {packageData.quantity || 'N/A'}</p>
                                        <p><strong>Carrier Ref. No:</strong> {packageData.carrierReferenceNo || 'N/A'}</p>
                                        <p><strong>Departure Time:</strong> {formatTime(packageData.departureTime)}</p>
                                        <p><strong>Pickup Date:</strong> {formatDate(packageData.pickupDate)}</p>
                                        <p><strong>Pickup Time:</strong> {formatTime(packageData.pickupTime)}</p>
                                        <p><strong>Estimated Delivery:</strong> {formatDate(packageData.estimatedDeliveryDate)}</p>
                                        <p><strong>Total Freight:</strong> {packageData.shippingCost ? `$${parseFloat(packageData.shippingCost).toFixed(2)}` : 'N/A'}</p>
                                    </div>
                                </div>

                                {/* Main Item Details (renamed and adjusted) */}
                                <div className="md:col-span-2 mt-4 border-t pt-4 border-gray-200 dark:border-gray-700">
                                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 flex items-center">
                                        <LuClipboardList className="mr-2 h-5 w-5 text-indigo-500" /> Main Item Information
                                    </h4>
                                    <p><strong>Item Name:</strong> {packageData.itemDetails?.mainItemName || 'N/A'}</p>
                                    <p><strong>Description:</strong> {packageData.itemDetails?.mainItemDescription || 'N/A'}</p>
                                    <p><strong>Package Type (Main):</strong> {packageData.packageType || 'N/A'}</p>
                                    <p><strong>Overall Weight:</strong> {packageData.weight ? `${packageData.weight} kg` : 'N/A'}</p>
                                    <p><strong>Overall Dimensions:</strong> {packageData.dimensions || 'N/A'}</p>
                                    <p><strong>Declared Value:</strong> {packageData.declaredValue ? `$${parseFloat(packageData.declaredValue).toFixed(2)}` : 'N/A'}</p>
                                    <p><strong>Comments:</strong> {packageData.comments || 'N/A'}</p>
                                </div>

                                {/* Dynamic Package Items Section */}
                                <div className="md:col-span-2 mt-4 border-t pt-4 border-gray-200 dark:border-gray-700">
                                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 flex items-center">
                                        <LuBox className="mr-2 h-5 w-5 text-indigo-500" /> Individual Package Breakdown
                                    </h4>
                                    {packageData.packageItems && packageData.packageItems.length > 0 ? (
                                        <div className="space-y-4">
                                            {packageData.packageItems.map((item, index) => (
                                                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-600">
                                                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Item #{index + 1}</p>
                                                    <p><strong>Qty:</strong> {item.qty || 'N/A'}</p>
                                                    <p><strong>Piece Type:</strong> {item.pieceType || 'N/A'}</p>
                                                    <p><strong>Description:</strong> {item.description || 'N/A'}</p>
                                                    <p><strong>Dimensions (LxWxH):</strong> {item.lengthCm || 'N/A'}cm x {item.widthCm || 'N/A'}cm x {item.heightCm || 'N/A'}cm</p>
                                                    <p><strong>Weight:</strong> {item.weightKg ? `${item.weightKg} kg` : 'N/A'}</p>
                                                </div>
                                            ))}
                                            <div className="mt-4 flex flex-col sm:flex-row justify-between text-sm text-gray-700 dark:text-gray-300 font-semibold">
                                                <span>Total Volumetric Weight: {calculateTotalVolumetricWeight()} cu. m.</span>
                                                <span>Total Actual Weight: {calculateTotalActualWeight()} kg.</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400">No individual package items detailed.</p>
                                    )}
                                </div>

                                {/* Tracking History (remains the same) */}
                                <div className="md:col-span-2 mt-4 border-t pt-4 border-gray-200 dark:border-gray-700">
                                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 flex items-center">
                                        <LuCalendar className="mr-2 h-5 w-5 text-indigo-500" /> Tracking History
                                    </h4>
                                    {packageData.trackingHistory && packageData.trackingHistory.length > 0 ? (
                                        <ul className="space-y-3">
                                            {packageData.trackingHistory
                                                .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                                                .map((entry, index) => (
                                                    <li key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm border border-gray-200 dark:border-gray-600">
                                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{entry.status}</p>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                                            <span className="font-medium">Time:</span> {formatDate(entry.timestamp)}
                                                        </p>
                                                        {entry.location && <p className="text-xs text-gray-600 dark:text-gray-400"><span className="font-medium">Location:</span> {entry.location}</p>}
                                                        {entry.note && <p className="text-xs text-gray-600 dark:text-gray-400"><span className="font-medium">Note:</span> {entry.note}</p>}
                                                    </li>
                                                ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400">No tracking history available.</p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* The hidden PdfTemplate components were also for direct print functionality and are removed */}
        </>
    );
}

export default PackageDetailsModal;