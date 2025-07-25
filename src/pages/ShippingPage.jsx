import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LuMapPin, LuDollarSign, LuWeight, LuTruck, LuCalendarCheck } from 'react-icons/lu';
import { useForm } from 'react-hook-form'; // For form management
import { yupResolver } from '@hookform/resolvers/yup'; // For validation
import * as yup from 'yup'; // For schema definition
import { RxDimensions } from "react-icons/rx";
import { CiUser } from "react-icons/ci";
import { LuPackage2 } from "react-icons/lu";


// Validation Schema
const schema = yup.object().shape({
  senderName: yup.string().required('Sender Name is required'),
  senderAddress: yup.string().required('Sender Address is required'),
  receiverName: yup.string().required('Receiver Name is required'),
  receiverAddress: yup.string().required('Receiver Address is required'),
  itemDescription: yup.string().required('Item Description is required'),
  weight: yup.number().typeError('Weight must be a number').min(0.1, 'Weight must be at least 0.1 kg').required('Weight is required'),
  length: yup.number().typeError('Length must be a number').min(1, 'Min length 1 cm').required('Length is required'),
  width: yup.number().typeError('Width must be a number').min(1, 'Min width 1 cm').required('Width is required'),
  height: yup.number().typeError('Height must be a number').min(1, 'Min height 1 cm').required('Height is required'),
  serviceType: yup.string().required('Service Type is required'),
});

function ShippingPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Watch for changes in dimensions and weight for live quote
  const watchedWeight = watch('weight');
  const watchedLength = watch('length');
  const watchedWidth = watch('width');
  const watchedHeight = watch('height');
  const watchedServiceType = watch('serviceType');

  // Mock quote calculation (simplified)
  const calculateQuote = () => {
    const w = parseFloat(watchedWeight);
    const l = parseFloat(watchedLength);
    const wi = parseFloat(watchedWidth);
    const h = parseFloat(watchedHeight);
    const service = watchedServiceType;

    if (!w || !l || !wi || !h || !service) return null;

    let baseCost = w * 5 + (l * wi * h) / 1000; // Example: weight cost + volume cost
    let serviceMultiplier = 1;

    switch (service) {
      case 'standard': serviceMultiplier = 1.0; break;
      case 'express': serviceMultiplier = 1.8; break;
      case 'economy': serviceMultiplier = 0.8; break;
      default: serviceMultiplier = 1.0; break;
    }

    const total = (baseCost * serviceMultiplier).toFixed(2);
    const deliveryDays = service === 'express' ? '1-3' : service === 'standard' ? '5-7' : '10-14';

    return { total, deliveryDays };
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

    const calculatedQuote = calculateQuote();
    if (calculatedQuote) {
      setQuote(calculatedQuote);
    } else {
      setQuote(null); // Should not happen with validation but as fallback
    }
    setIsLoading(false);
    console.log(data);
  };

  React.useEffect(() => {
    // Update quote live as fields change (without submitting form)
    if (watchedWeight && watchedLength && watchedWidth && watchedHeight && watchedServiceType) {
      setQuote(calculateQuote());
    } else {
      setQuote(null);
    }
  }, [watchedWeight, watchedLength, watchedWidth, watchedHeight, watchedServiceType]);


  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white text-center mb-10 md:mb-12"
      >
        Create New Shipment
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Sender Information */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center mb-4">
              <CiUser className="mr-2 h-6 w-6 text-indigo-600 dark:text-indigo-400" /> Sender Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="senderName" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  id="senderName"
                  {...register('senderName')}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder="John Doe"
                />
                {errors.senderName && <p className="text-red-500 text-xs mt-1">{errors.senderName.message}</p>}
              </div>
              <div>
                <label htmlFor="senderAddress" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  id="senderAddress"
                  {...register('senderAddress')}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder="123 Main St, Anytown, USA"
                />
                {errors.senderAddress && <p className="text-red-500 text-xs mt-1">{errors.senderAddress.message}</p>}
              </div>
            </div>
          </div>

          {/* Receiver Information */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center mb-4">
              <CiUser className="mr-2 h-6 w-6 text-indigo-600 dark:text-indigo-400" /> Sender InformationReceiver Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="receiverName" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  id="receiverName"
                  {...register('receiverName')}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder="Jane Smith"
                />
                {errors.receiverName && <p className="text-red-500 text-xs mt-1">{errors.receiverName.message}</p>}
              </div>
              <div>
                <label htmlFor="receiverAddress" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  id="receiverAddress"
                  {...register('receiverAddress')}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder="456 Oak Ave, Otherville, Canada"
                />
                {errors.receiverAddress && <p className="text-red-500 text-xs mt-1">{errors.receiverAddress.message}</p>}
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center mb-4">
              <LuPackage2 className="mr-2 h-6 w-6 text-indigo-600 dark:text-indigo-400" /> Package Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="itemDescription" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Description</label>
                <input
                  type="text"
                  id="itemDescription"
                  {...register('itemDescription')}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder="Documents, Electronics, etc."
                />
                {errors.itemDescription && <p className="text-red-500 text-xs mt-1">{errors.itemDescription.message}</p>}
              </div>
              <div>
                <label htmlFor="weight" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  id="weight"
                  {...register('weight')}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder="e.g., 2.5"
                />
                {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="length" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Length (cm)</label>
                <input
                  type="number"
                  step="1"
                  id="length"
                  {...register('length')}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder="e.g., 30"
                />
                {errors.length && <p className="text-red-500 text-xs mt-1">{errors.length.message}</p>}
              </div>
              <div>
                <label htmlFor="width" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Width (cm)</label>
                <input
                  type="number"
                  step="1"
                  id="width"
                  {...register('width')}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder="e.g., 20"
                />
                {errors.width && <p className="text-red-500 text-xs mt-1">{errors.width.message}</p>}
              </div>
              <div>
                <label htmlFor="height" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Height (cm)</label>
                <input
                  type="number"
                  step="1"
                  id="height"
                  {...register('height')}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder="e.g., 15"
                />
                {errors.height && <p className="text-red-500 text-xs mt-1">{errors.height.message}</p>}
              </div>
            </div>
          </div>

          {/* Service Type */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center mb-4">
              <LuTruck className="mr-2 h-6 w-6 text-indigo-600 dark:text-indigo-400" /> Service Options
            </h3>
            <label htmlFor="serviceType" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Choose Service Type</label>
            <select
              id="serviceType"
              {...register('serviceType')}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select a service</option>
              <option value="standard">Standard (5-7 Business Days)</option>
              <option value="express">Express (1-3 Business Days)</option>
              <option value="economy">Economy (10-14 Business Days)</option>
            </select>
            {errors.serviceType && <p className="text-red-500 text-xs mt-1">{errors.serviceType.message}</p>}
          </div>

          {/* Live Quote Display */}
          {quote && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-5 bg-indigo-50 dark:bg-indigo-900 rounded-lg shadow-md border border-indigo-200 dark:border-indigo-700 text-center"
            >
              <h4 className="flex items-center justify-center text-2xl font-bold text-indigo-800 dark:text-indigo-200 mb-2">
                <LuDollarSign className="mr-2 h-7 w-7" /> Estimated Quote: ${quote.total} USD
              </h4>
              <p className="text-indigo-700 dark:text-indigo-300 flex items-center justify-center">
                <LuCalendarCheck className="mr-2 h-5 w-5" /> Estimated Delivery: {quote.deliveryDays} Business Days
              </p>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 text-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <LuPackage2 className="h-5 w-5 mr-2" />
            )}
            {isLoading ? 'Calculating...' : 'Get Quote & Create Shipment'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default ShippingPage;