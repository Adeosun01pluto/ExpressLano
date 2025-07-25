import {
  LuPackage,
  LuMapPin,
  LuCalendar,
  LuEye,
  LuTruck,
  LuTrash2,
  LuPlane, // New icon for Air Freight
  LuShip, // New icon for Sea Transport
  LuGlobe, // Generic icon for Land Shipping
  LuFileText, // Icon for Invoice/Waybill
} from 'react-icons/lu'; // All icons from react-icons/lu
import { MdEdit } from "react-icons/md";
import { FaShippingFast } from 'react-icons/fa'; // Icon for courier

function PackageCard({ packageData, onViewDetails, onEdit, onUpdateStatus, onDelete }) { // Added new props

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

  // Determine status color
  const getStatusColorClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'In Transit':
      case 'Out for Delivery':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Exception':
      case 'Canceled':
      case 'Returned':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Determine shipment type icon
  const getShipmentTypeIcon = (type) => {
    switch (type) {
      case 'Air Freight':
        return <LuPlane className="mr-2 text-indigo-500 flex-shrink-0" />;
      case 'Sea Transport':
        return <LuShip className="mr-2 text-indigo-500 flex-shrink-0" />;
      case 'Land Shipping':
        return <LuGlobe className="mr-2 text-indigo-500 flex-shrink-0" />;
      default:
        return <LuTruck className="mr-2 text-indigo-500 flex-shrink-0" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="p-6 flex-grow">
        {/* Header Section: Package ID and Status */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <LuPackage className="mr-2 text-indigo-600 dark:text-indigo-400" />
            {packageData.packageId || 'N/A'}
          </h3>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColorClass(packageData.currentStatus)}`}>
            {packageData.currentStatus || 'N/A'}
          </span>
        </div>

        {/* Key Details */}
        <div className="text-gray-700 dark:text-gray-300 space-y-2 mb-4">
          {/* Origin and Destination */}
          <p className="flex items-center">
            <LuMapPin className="mr-2 text-indigo-500 flex-shrink-0" />
            <span className="truncate" title={`From: ${packageData.origin || 'N/A'} to ${packageData.destination || 'N/A'}`}>
              <strong className="text-gray-900 dark:text-white">From:</strong> {packageData.origin || 'N/A'} <span className="font-semibold mx-1">&rarr;</span> <strong className="text-gray-900 dark:text-white">To:</strong> {packageData.destination || 'N/A'}
            </span>
          </p>

          {/* Type of Shipment */}
          <p className="flex items-center">
            {getShipmentTypeIcon(packageData.typeOfShipment)}
            <strong className="text-gray-900 dark:text-white">Shipment Type:</strong> {packageData.typeOfShipment || 'N/A'}
          </p>

          {/* Courier */}
          <p className="flex items-center">
            <FaShippingFast className="mr-2 text-indigo-500 flex-shrink-0" />
            <strong className="text-gray-900 dark:text-white">Courier:</strong> {packageData.courier || 'N/A'}
          </p>

          {/* Estimated Delivery Date */}
          <p className="flex items-center">
            <LuCalendar className="mr-2 text-indigo-500 flex-shrink-0" />
            <strong className="text-gray-900 dark:text-white">Est. Delivery:</strong> {formatDate(packageData.estimatedDeliveryDate)}
          </p>

          {/* Main Item Name (changed from itemDescription directly) */}
          <p>
            <strong className="text-gray-900 dark:text-white">Main Item:</strong> {packageData.itemDetails?.mainItemName || 'N/A'}
          </p>

          {/* Last Update */}
          <p>
            <strong className="text-gray-900 dark:text-white">Last Update:</strong> {formatDate(packageData.updatedAt)}
          </p>
        </div>
      </div>

      {/* Actions Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 grid grid-cols-2 sm:grid-cols-4 gap-2"> {/* Changed to grid for better layout */}
        <button
          onClick={() => onViewDetails(packageData)}
          className="flex items-center justify-center px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
          title="View Details"
        >
          <LuEye className="mr-1" /> Details
        </button>
        <button
          onClick={() => onEdit(packageData)}
          className="flex items-center justify-center px-3 py-2 bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-200 rounded-md hover:bg-blue-200 dark:hover:bg-blue-600 transition-colors text-sm font-medium"
          title="Edit Package"
        >
          <MdEdit className="mr-1" /> Edit
        </button>
        <button
          onClick={() => onUpdateStatus(packageData)}
          className="flex items-center justify-center px-3 py-2 bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200 rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-600 transition-colors text-sm font-medium"
          title="Update Status"
        >
          <LuTruck className="mr-1" /> Status
        </button>
        <button
          onClick={() => onDelete(packageData.packageId)}
          className="flex items-center justify-center px-3 py-2 bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-200 rounded-md hover:bg-red-200 dark:hover:bg-red-600 transition-colors text-sm font-medium"
          title="Delete Package"
        >
          <LuTrash2 className="mr-1" /> Delete
        </button>
      </div>
    </div>
  );
}

export default PackageCard;