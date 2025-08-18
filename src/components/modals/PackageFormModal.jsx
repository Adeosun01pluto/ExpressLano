// components/modals/PackageFormModal.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoXCircle, GoUpload } from 'react-icons/go';
import { LuFileText, LuTrash2, LuExternalLink } from 'react-icons/lu'; // Added FaCirclePlus for adding package items
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique keys for dynamic items
import { FaCirclePlus } from "react-icons/fa6";

function PackageFormModal({ isOpen, onClose, packageData, onSave, isEditing }) {
  const [formData, setFormData] = useState({
    packageId: '', // Your custom PKGxxx ID
    senderName: '',
    senderAddress: '',
    senderEmail: '',
    senderPhone: '',
    receiverName: '',
    receiverAddress: '',
    receiverEmail: '',
    receiverPhone: '',
    // Renamed itemDescription to mainItemDescription and itemName to mainItemName
    mainItemDescription: '', 
    mainItemName: '', 
    weight: '', // This will be the overall package weight, not individual item weight
    dimensions: '', // e.g., "10x20x30 cm"
    declaredValue: '',
    packageType: '', // This will be used for the 'Packages' field (e.g., 'Vehicle')
    shippingCost: '',
    currentStatus: 'Order Placed',
    origin: '',
    destination: '',
    estimatedDeliveryDate: '',
    comments: '', // Renamed from 'notes'
    trackingProgress: '', // New field for tracking progress
    // New Fields from screenshots
    typeOfShipment: '', // e.g., Air Freight, Sea Transport
    courier: '', // e.g., USPS, DHL
    paymentMode: '', // e.g., Crypto, Cash
    product: '', // Specific product name, e.g., "2022 Toyota C-HR SUV Car"
    quantity: '', // Overall quantity of main product/items
    carrierReferenceNo: '',
    departureTime: '',
    pickupDate: '',
    pickupTime: '',
  });

  const [invoiceFile, setInvoiceFile] = useState(null);
  const [existingInvoiceUrl, setExistingInvoiceUrl] = useState(null);
  const [removeExistingInvoice, setRemoveExistingInvoice] = useState(false);

  // New state for dynamic package items
  const [packageItems, setPackageItems] = useState([]);

  useEffect(() => {
    if (isOpen && packageData) {
      setFormData({
        packageId: packageData.packageId || '',
        senderName: packageData.senderName || '',
        senderAddress: packageData.senderAddress || '',
        senderEmail: packageData.senderEmail || '',
        senderPhone: packageData.senderPhone || '',
        receiverName: packageData.receiverName || '',
        receiverAddress: packageData.receiverAddress || '',
        receiverEmail: packageData.receiverEmail || '',
        receiverPhone: packageData.receiverPhone || '',
        // Map itemDetails back to top-level fields for the form
        mainItemDescription: packageData.itemDetails?.description || '',
        mainItemName: packageData.itemDetails?.itemName || '',
        weight: packageData.weight || '',
        dimensions: packageData.dimensions || '',
        declaredValue: packageData.declaredValue || '',
        packageType: packageData.packageType || '',
        shippingCost: packageData.shippingCost || '',
        currentStatus: packageData.currentStatus || 'Order Placed',
        origin: packageData.origin || '',
        destination: packageData.destination || '',
        estimatedDeliveryDate: packageData.estimatedDeliveryDate
          ? new Date(packageData.estimatedDeliveryDate).toISOString().split('T')[0]
          : '',
        comments: packageData.comments || '', // Mapping notes to comments

        // Initialize new fields
        typeOfShipment: packageData.typeOfShipment || '',
        courier: packageData.courier || '',
        paymentMode: packageData.paymentMode || '',
        product: packageData.product || '',
        quantity: packageData.quantity || '',
        carrierReferenceNo: packageData.carrierReferenceNo || '',
        departureTime: packageData.departureTime || '',
        pickupDate: packageData.pickupDate
          ? new Date(packageData.pickupDate).toISOString().split('T')[0]
          : '',
        pickupTime: packageData.pickupTime || '',
      });
      setExistingInvoiceUrl(packageData.invoiceUrl || null);
      setInvoiceFile(null);
      setRemoveExistingInvoice(false);

      // Initialize packageItems for editing
      setPackageItems(packageData.packageItems?.length ? packageData.packageItems.map(item => ({ ...item, id: uuidv4() })) : []);

    } else if (!isOpen) {
      // Reset form when modal closes
      setFormData({
        packageId: '',
        senderName: '',
        senderAddress: '',
        senderEmail: '',
        senderPhone: '',
        receiverName: '',
        receiverAddress: '',
        receiverEmail: '',
        receiverPhone: '',
        mainItemDescription: '',
        mainItemName: '',
        weight: '',
        dimensions: '',
        declaredValue: '',
        packageType: '',
        shippingCost: '',
        currentStatus: 'Order Placed',
        origin: '',
        destination: '',
        estimatedDeliveryDate: '',
        comments: '',

        typeOfShipment: '',
        courier: '',
        paymentMode: '',
        product: '',
        quantity: '',
        carrierReferenceNo: '',
        departureTime: '',
        pickupDate: '',
        pickupTime: '',
      });
      setInvoiceFile(null);
      setExistingInvoiceUrl(null);
      setRemoveExistingInvoice(false);
      setPackageItems([]); // Reset dynamic package items
    }
  }, [isOpen, packageData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setInvoiceFile(e.target.files[0]);
      setRemoveExistingInvoice(false);
    } else {
      setInvoiceFile(null);
    }
  };

  const handleRemoveExistingInvoice = () => {
    setExistingInvoiceUrl(null);
    setInvoiceFile(null);
    setRemoveExistingInvoice(true);
  };

  // --- Functions for dynamic package items ---
  const addPackageItem = () => {
    setPackageItems((prevItems) => [
      ...prevItems,
      {
        id: uuidv4(), // Unique ID for key prop
        qty: '',
        pieceType: '',
        description: '',
        lengthCm: '',
        widthCm: '',
        heightCm: '',
        weightKg: '',
      },
    ]);
  };

  const removePackageItem = (idToRemove) => {
    setPackageItems((prevItems) => prevItems.filter((item) => item.id !== idToRemove));
  };

  const handlePackageItemChange = (id, field, value) => {
    setPackageItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };
  // --- End Functions for dynamic package items ---


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalFormData = { ...formData };

      if (isEditing) {
        if (removeExistingInvoice) {
          finalFormData.invoiceUrl = null;
        } else if (invoiceFile) {
          delete finalFormData.invoiceUrl;
        } else {
          finalFormData.invoiceUrl = existingInvoiceUrl;
        }
      } else {
        delete finalFormData.invoiceUrl;
      }

      // Re-structure item details and add new fields for the final save
      const packageToSave = {
        ...finalFormData,
        itemDetails: { // Renamed from itemDetails
          itemName: finalFormData.mainItemName,
          description: finalFormData.mainItemDescription,
        },
        packageItems: packageItems.map(item => {
            // Remove the temporary 'id' from packageItems before saving
            const { id, ...rest } = item;
            return rest;
        }),
      };

      // Remove top-level mainItemDescription and mainItemName as they are now nested
      delete packageToSave.mainItemDescription;
      delete packageToSave.mainItemName;
      // Also remove comments if we renamed notes to comments, to avoid duplication if notes still exists in backend
      // If 'notes' is truly replaced by 'comments' on the backend, this line is fine.
      // If 'notes' is a separate field you still want to send, remove this line.
      // For now, assuming 'notes' is now 'comments'
      // delete packageToSave.notes; // Only if you explicitly renamed 'notes' to 'comments' in backend payload

      await onSave(packageToSave, isEditing ? packageData.id : null, invoiceFile);
      onClose();
    } catch (error) {
      console.error('Failed to save package:', error);
      // TODO: Show an error toast to the user
    }
  };

  if (!isOpen) return null;

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
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative" // Increased max-w to 4xl
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              aria-label="Close modal"
            >
              <GoXCircle />
            </button>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {isEditing ? 'Edit Package' : 'Create New Package'}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Package ID (Read-only if editing) */}
              {isEditing && (
                <div className="col-span-full">
                  <label htmlFor="packageId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Package ID (System Generated)
                  </label>
                  <input
                    type="text"
                    id="packageId"
                    name="packageId"
                    value={formData.packageId}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 cursor-not-allowed"
                  />
                </div>
              )}

              {/* Sender Info */}
              <h3 className="col-span-full text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4 mb-2">Sender Details</h3>
              <div>
                <label htmlFor="senderName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sender Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="senderName"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="senderAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sender Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="senderAddress"
                  name="senderAddress"
                  value={formData.senderAddress}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sender Email
                </label>
                <input
                  type="email"
                  id="senderEmail"
                  name="senderEmail"
                  value={formData.senderEmail}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="senderPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sender Phone
                </label>
                <input
                  type="tel"
                  id="senderPhone"
                  name="senderPhone"
                  value={formData.senderPhone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>

              {/* Receiver Info */}
              <h3 className="col-span-full text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4 mb-2">Receiver Details</h3>
              <div>
                <label htmlFor="receiverName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Receiver Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="receiverName"
                  name="receiverName"
                  value={formData.receiverName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="receiverAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Receiver Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="receiverAddress"
                  name="receiverAddress"
                  value={formData.receiverAddress}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="receiverEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Receiver Email
                </label>
                <input
                  type="email"
                  id="receiverEmail"
                  name="receiverEmail"
                  value={formData.receiverEmail}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="receiverPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Receiver Phone
                </label>
                <input
                  type="tel"
                  id="receiverPhone"
                  name="receiverPhone"
                  value={formData.receiverPhone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>

              {/* Shipment Details - Main Item */}
              <h3 className="col-span-full text-xl font-semibold text-indigo-600 dark:text-indigo-400 mt-4 mb-2">Shipment Details</h3>
              <div>
                <label htmlFor="typeOfShipment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Type of Shipment <span className="text-red-500">*</span>
                </label>
                <select
                  id="typeOfShipment"
                  name="typeOfShipment"
                  value={formData.typeOfShipment}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                  <option value="">-- Select One --</option>
                  <option value="Air Freight">Air Freight</option>
                  <option value="Sea Transport">Sea Transport</option>
                  <option value="Land Shipping">Land Shipping</option>
                </select>
              </div>
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Overall Weight (kg) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="courier" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Courier <span className="text-red-500">*</span>
                </label>
                <select
                  id="courier"
                  name="courier"
                  value={formData.courier}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                  <option value="">-- Select One --</option>
                  <option value="USPS">USPS</option>
                  <option value="DHL">DHL</option>
                  <option value="FedEx">FedEx</option>
                  <option value="Expresslane-Cargo">Expresslane-Cargo</option>
                </select>
              </div>
              <div>
                <label htmlFor="packageType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Packages (Main Item Type)
                </label>
                <input
                  type="text"
                  id="packageType"
                  name="packageType"
                  value={formData.packageType}
                  onChange={handleChange}
                  placeholder="e.g., Vehicle, Documents"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="product" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Product
                </label>
                <input
                  type="text"
                  id="product"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  step="1"
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="paymentMode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payment Mode
                </label>
                <select
                  id="paymentMode"
                  name="paymentMode"
                  value={formData.paymentMode}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                  <option value="">-- Select One --</option>
                  <option value="CASH">CASH</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Crypto">Crypto</option>
                  <option value="WesternUnion">WesternUnion</option>
                  <option value="CashApp">CashApp</option>
                  <option value="Bank">Bank</option>
                </select>
              </div>
              <div>
                <label htmlFor="shippingCost" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Total Freight ($)
                </label>
                <input
                  type="number"
                  id="shippingCost"
                  name="shippingCost"
                  value={formData.shippingCost}
                  onChange={handleChange}
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="carrierReferenceNo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Carrier Reference No.
                </label>
                <input
                  type="text"
                  id="carrierReferenceNo"
                  name="carrierReferenceNo"
                  value={formData.carrierReferenceNo}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Departure Time
                </label>
                <input
                  type="time"
                  id="departureTime"
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="origin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Origin <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="origin"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Destination <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Pickup Date
                </label>
                <input
                  type="date"
                  id="pickupDate"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Pickup Time
                </label>
                <input
                  type="time"
                  id="pickupTime"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="estimatedDeliveryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Estimated Delivery Date
                </label>
                <input
                  type="date"
                  id="estimatedDeliveryDate"
                  name="estimatedDeliveryDate"
                  value={formData.estimatedDeliveryDate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="currentStatus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Status <span className="text-red-500">*</span>
                </label>
                <select
                  id="currentStatus"
                  name="currentStatus"
                  value={formData.currentStatus}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Picked Up">Picked Up</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Arrived at Hub">Arrived at Hub</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Exception">Exception</option>
                </select>
              </div>
              <div>
                <label htmlFor="declaredValue" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Declared Value ($)
                </label>
                <input
                  type="number"
                  id="declaredValue"
                  name="declaredValue"
                  value={formData.declaredValue}
                  onChange={handleChange}
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Overall Dimensions (LxWxH cm)
                </label>
                <input
                  type="text"
                  id="dimensions"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  placeholder="e.g., 10x20x30 cm"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
               <div className="md:col-span-2">
                <label htmlFor="mainItemName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Main Item Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="mainItemName"
                  name="mainItemName"
                  value={formData.mainItemName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="mainItemDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Main Item Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="mainItemDescription"
                  name="mainItemDescription"
                  value={formData.mainItemDescription}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                ></textarea>
              </div>

              {/* Comments (renamed from Notes) */}
              <div className="md:col-span-2">
                <label htmlFor="comments" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Comments
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                ></textarea>
              </div>

              {/* Dynamic Package Items Section */}
              <div className="md:col-span-2 mt-4 border-t pt-4 border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <LuFileText className="mr-2 h-5 w-5 text-indigo-600" /> Individual Package Items
                </h3>

                {packageItems.length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">No individual items added yet. Click "Add Package Item" to add details for multiple items within this shipment.</p>
                )}

                {packageItems.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 mb-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 relative">
                    <button
                      type="button"
                      onClick={() => removePackageItem(item.id)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-800 transition-colors"
                      aria-label="Remove item"
                      title="Remove this item"
                    >
                      <GoXCircle className="h-6 w-6" />
                    </button>
                    <div className="col-span-full text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Item #{index + 1}</div>
                    
                    <div>
                      <label htmlFor={`qty-${item.id}`} className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Qty</label>
                      <input
                        type="number"
                        id={`qty-${item.id}`}
                        value={item.qty}
                        onChange={(e) => handlePackageItemChange(item.id, 'qty', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-2 py-1 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm"
                        min="0"
                      />
                    </div>
                    <div>
                      <label htmlFor={`pieceType-${item.id}`} className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Piece Type</label>
                      <select
                        id={`pieceType-${item.id}`}
                        value={item.pieceType}
                        onChange={(e) => handlePackageItemChange(item.id, 'pieceType', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-2 py-1 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm"
                      >
                        <option value="">- Select Type -</option>
                        <option value="Pallet">Pallet</option>
                        <option value="Carton">Carton</option>
                        <option value="Crate">Crate</option>
                        <option value="Loose">Loose</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    <div className="col-span-full">
                      <label htmlFor={`description-${item.id}`} className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                      <input
                        type="text"
                        id={`description-${item.id}`}
                        value={item.description}
                        onChange={(e) => handlePackageItemChange(item.id, 'description', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-2 py-1 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor={`lengthCm-${item.id}`} className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Length (cm)</label>
                      <input
                        type="number"
                        id={`lengthCm-${item.id}`}
                        value={item.lengthCm}
                        onChange={(e) => handlePackageItemChange(item.id, 'lengthCm', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-2 py-1 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label htmlFor={`widthCm-${item.id}`} className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Width (cm)</label>
                      <input
                        type="number"
                        id={`widthCm-${item.id}`}
                        value={item.widthCm}
                        onChange={(e) => handlePackageItemChange(item.id, 'widthCm', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-2 py-1 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label htmlFor={`heightCm-${item.id}`} className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Height (cm)</label>
                      <input
                        type="number"
                        id={`heightCm-${item.id}`}
                        value={item.heightCm}
                        onChange={(e) => handlePackageItemChange(item.id, 'heightCm', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-2 py-1 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label htmlFor={`weightKg-${item.id}`} className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Weight (kg)</label>
                      <input
                        type="number"
                        id={`weightKg-${item.id}`}
                        value={item.weightKg}
                        onChange={(e) => handlePackageItemChange(item.id, 'weightKg', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-2 py-1 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm"
                        step="0.01"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addPackageItem}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center justify-center"
                >
                  <FaCirclePlus className="mr-2" /> Add Package Item
                </button>
                {/* Placeholder for calculations - you would implement the logic here */}
                <div className="mt-4 flex flex-col sm:flex-row justify-between text-sm text-gray-700 dark:text-gray-300">
                    <span>Total Volumetric Weight: 0.00cu. m.</span>
                    <span>Total Actual Weight: 0.00kg.</span>
                </div>
              </div>

              {/* Invoice PDF Upload Section */}
              <div className="md:col-span-2 mt-4 border-t pt-4 border-gray-200 dark:border-gray-700">
                <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                  <GoUpload className="mr-2 h-6 w-6 text-indigo-600" /> Invoice PDF
                </label>

                {existingInvoiceUrl && !removeExistingInvoice && (
                  <div className="flex items-center space-x-3 mb-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-md border border-gray-200 dark:border-gray-600">
                    <LuFileText className="h-6 w-6 text-green-600 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-200 flex-grow">
                      Existing Invoice: <a href={existingInvoiceUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline dark:text-indigo-400 break-all">
                        {existingInvoiceUrl.split('/').pop().split('?')[0]} <LuExternalLink className="inline ml-1" />
                      </a>
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveExistingInvoice}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-800 transition-colors"
                      aria-label="Remove existing invoice"
                      title="Remove existing invoice"
                    >
                      <LuTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                )}

                {/* File Input */}
                <input
                  type="file"
                  id="invoiceFile"
                  name="invoiceFile"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100 dark:file:bg-indigo-700 dark:file:text-indigo-200 dark:hover:file:bg-indigo-600
                    cursor-pointer"
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {invoiceFile ? `Selected: ${invoiceFile.name}` : 'Upload a new invoice PDF (optional).'}
                </p>
                {existingInvoiceUrl && !invoiceFile && !removeExistingInvoice && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Upload a new file above to replace the existing invoice.
                  </p>
                )}
                {removeExistingInvoice && (
                  <p className="mt-1 text-sm text-orange-500 dark:text-orange-400">
                    Existing invoice marked for removal. Submit to confirm.
                  </p>
                )}
              </div>

              {/* Form Actions */}
              <div className="col-span-full flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  {isEditing ? 'Save Changes' : 'Create Package'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PackageFormModal;