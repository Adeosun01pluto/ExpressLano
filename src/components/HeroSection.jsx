import React from 'react';
import { motion } from 'framer-motion';
import { LuArrowRight } from 'react-icons/lu'; // Using Lucide React Icons for CTA arrow

function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden
                        bg-gradient-to-br from-indigo-600 to-blue-500
                        dark:from-gray-950 dark:to-gray-800">

      {/* Subtle Background Animation */}
      <motion.div
        className="absolute inset-0 z-0 opacity-20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
        }}
      ></motion.div>

      <div className="relative z-10 p-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg"
        >
          Your World, <br className="md:hidden" /> Our Delivery.
          <br />Global Reach, Local Care.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto"
        >
          Experience seamless global logistics. Track, manage, and ship your packages with unparalleled precision and ease.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 bg-white text-indigo-700 text-lg md:text-xl font-bold rounded-full shadow-xl
                     flex items-center justify-center mx-auto transition-all duration-300
                     hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
          onClick={() => console.log('CTA: Navigate to Tracking Page!')} // Placeholder for navigation
        >
          Track Your Shipment Now
          <LuArrowRight className="ml-3 h-6 w-6" />
        </motion.button>
      </div>
    </section>
  );
}

export default HeroSection;