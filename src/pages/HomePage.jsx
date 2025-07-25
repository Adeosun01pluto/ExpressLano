// import React from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import {
//   LuTruck, LuPackage, LuMapPin, LuDollarSign, LuShieldCheck,
//   LuClock, LuUsers, LuArrowRight, LuZap
// } from 'react-icons/lu'; // Icons for the new sections

// const sectionVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
// };

// const itemVariants = {
//   hidden: { opacity: 0, scale: 0.8 },
//   visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
// };

// function HomePage() {
//   return (
//     <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

//       {/* Hero Section - Elevated from previous HeroSection.js */}
//       <section className="relative h-screen flex items-center justify-center text-center overflow-hidden px-4">
//         {/* Background Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 to-purple-900 dark:from-indigo-900 dark:to-purple-950 opacity-90"></div>
//         {/* Animated Background Shapes */}
//         <motion.div
//           className="absolute inset-0 z-0"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 0.3 }}
//           transition={{ duration: 2, ease: "easeInOut" }}
//         >
//           <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-indigo-400 dark:bg-indigo-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
//           <div className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-purple-400 dark:bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
//           <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-400 dark:bg-blue-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
//         </motion.div>

//         {/* Content */}
//         <div className="relative z-10 p-6 max-w-4xl mx-auto">
//           <motion.h1
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.2 }}
//             className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg"
//           >
//             Your Global Shipping & Tracking Partner
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.4 }}
//             className="text-xl md:text-2xl text-indigo-100 mb-10 drop-shadow-md"
//           >
//             Track your packages worldwide with unparalleled accuracy, manage consignments, and get instant shipping quotes.
//           </motion.p>
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
//             className="flex flex-col sm:flex-row justify-center gap-4"
//           >
//             <Link
//               to="/consignment"
//               className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-700 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-lg"
//             >
//               <LuTruck className="h-6 w-6 mr-3" /> Track Your Package
//             </Link>
//             <Link
//               to="/"
//               className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 text-lg border-2 border-indigo-600 hover:border-indigo-700"
//             >
//               <LuPackage className="h-6 w-6 mr-3" /> Get a Shipping Quote
//             </Link>
//           </motion.div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="py-16 md:py-24 px-4 bg-gray-100 dark:bg-gray-850">
//         <motion.h2
//           className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white text-center mb-12"
//           variants={sectionVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//         >
//           How It Works
//         </motion.h2>
//         <motion.div
//           className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
//           variants={sectionVariants} // Apply stagger to children
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//         >
//           <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl text-center border border-gray-100 dark:border-gray-700" variants={itemVariants}>
//             <div className="flex items-center justify-center w-20 h-20 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full mx-auto mb-6 text-4xl font-bold">1</div>
//             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Place Your Order</h3>
//             <p className="text-gray-700 dark:text-gray-300">Easily create new shipping orders and get instant quotes.</p>
//           </motion.div>
//           <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl text-center border border-gray-100 dark:border-gray-700" variants={itemVariants}>
//             <div className="flex items-center justify-center w-20 h-20 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full mx-auto mb-6 text-4xl font-bold">2</div>
//             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Track Real-time</h3>
//             <p className="text-gray-700 dark:text-gray-300">Receive live updates on your package's journey, from origin to destination.</p>
//           </motion.div>
//           <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl text-center border border-gray-100 dark:border-gray-700" variants={itemVariants}>
//             <div className="flex items-center justify-center w-20 h-20 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full mx-auto mb-6 text-4xl font-bold">3</div>
//             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Guaranteed Delivery</h3>
//             <p className="text-gray-700 dark:text-gray-300">Rest assured knowing your package will arrive safely and on time.</p>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* Our Services Section */}
//       <section className="py-16 md:py-24 px-4 bg-gray-50 dark:bg-gray-900">
//         <motion.h2
//           className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white text-center mb-12"
//           variants={sectionVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//         >
//           Our Core Services
//         </motion.h2>
//         <motion.div
//           className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
//           variants={sectionVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//         >
//           <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl text-center border border-gray-100 dark:border-gray-700 hover:scale-[1.02] transition-transform duration-300" variants={itemVariants}>
//             <LuMapPin className="h-16 w-16 text-indigo-600 dark:text-indigo-400 mx-auto mb-6" />
//             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Global Package Tracking</h3>
//             <p className="text-gray-700 dark:text-gray-300">Track parcels from over 1000 carriers worldwide with real-time updates and detailed history.</p>
//             <Link to="/consignment" className="mt-4 inline-flex items-center text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
//               Learn More <LuArrowRight className="ml-1" />
//             </Link>
//           </motion.div>
//           <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl text-center border border-gray-100 dark:border-gray-700 hover:scale-[1.02] transition-transform duration-300" variants={itemVariants}>
//             <LuTruck className="h-16 w-16 text-green-600 dark:text-green-400 mx-auto mb-6" />
//             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Consignment Management</h3>
//             <p className="text-gray-700 dark:text-gray-300">Monitor large shipments and consignments with detailed sender/receiver info and progress maps.</p>
//             <Link to="/consignment" className="mt-4 inline-flex items-center text-green-600 dark:text-green-400 font-semibold hover:underline">
//               Learn More <LuArrowRight className="ml-1" />
//             </Link>
//           </motion.div>
//           <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl text-center border border-gray-100 dark:border-gray-700 hover:scale-[1.02] transition-transform duration-300" variants={itemVariants}>
//             <LuDollarSign className="h-16 w-16 text-purple-600 dark:text-purple-400 mx-auto mb-6" />
//             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Instant Shipping Quotes</h3>
//             <p className="text-gray-700 dark:text-gray-300">Create new shipping orders and get live, competitive quotes for various service types.</p>
//             <Link to="/" className="mt-4 inline-flex items-center text-purple-600 dark:text-purple-400 font-semibold hover:underline">
//               Learn More <LuArrowRight className="ml-1" />
//             </Link>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* Why Choose Us Section */}
//       <section className="py-16 md:py-24 px-4 bg-gray-100 dark:bg-gray-850">
//         <motion.h2
//           className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white text-center mb-12"
//           variants={sectionVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//         >
//           Why Choose Global Tracker?
//         </motion.h2>
//         <motion.div
//           className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
//           variants={sectionVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//         >
//           <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl flex items-start space-x-6 border border-gray-100 dark:border-gray-700" variants={itemVariants}>
//             <LuShieldCheck className="h-14 w-14 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-1" />
//             <div>
//               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Unmatched Reliability</h3>
//               <p className="text-gray-700 dark:text-gray-300">Our robust infrastructure ensures your data is always accurate and secure, providing peace of mind with every shipment.</p>
//             </div>
//           </motion.div>
//           <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl flex items-start space-x-6 border border-gray-100 dark:border-gray-700" variants={itemVariants}>
//             <LuClock className="h-14 w-14 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
//             <div>
//               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Real-time Efficiency</h3>
//               <p className="text-gray-700 dark:text-gray-300">Get instant updates and live quotes, saving you time and keeping you informed at every stage.</p>
//             </div>
//           </motion.div>
//           <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl flex items-start space-x-6 border border-gray-100 dark:border-gray-700" variants={itemVariants}>
//             <LuUsers className="h-14 w-14 text-lime-600 dark:text-lime-400 flex-shrink-0 mt-1" />
//             <div>
//               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Dedicated Support</h3>
//               <p className="text-gray-700 dark:text-gray-300">Our expert customer service team is always ready to assist you with any query or challenge.</p>
//             </div>
//           </motion.div>
//           <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl flex items-start space-x-6 border border-gray-100 dark:border-gray-700" variants={itemVariants}>
//             <LuZap className="h-14 w-14 text-fuchsia-600 dark:text-fuchsia-400 flex-shrink-0 mt-1" />
//             <div>
//               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Seamless Integration</h3>
//               <p className="text-gray-700 dark:text-gray-300">Our platform is designed for ease of use, providing a smooth and intuitive experience for all your logistics needs.</p>
//             </div>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* Final Call-to-Action Section */}
//       <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-indigo-600 to-purple-700 dark:from-indigo-800 dark:to-purple-900 text-white text-center">
//         <motion.div
//           className="max-w-4xl mx-auto"
//           variants={sectionVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//         >
//           <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
//             Ready to Simplify Your Logistics?
//           </h2>
//           <p className="text-xl md:text-2xl text-indigo-100 mb-10">
//             Join thousands of satisfied users who trust Global Tracker for their shipping and tracking needs.
//           </p>
//           <Link
//             to="/"
//             className="inline-flex items-center justify-center px-10 py-5 bg-white text-indigo-700 font-bold rounded-full shadow-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-xl"
//           >
//             <LuPackage className="h-7 w-7 mr-3" /> Get Started Today
//           </Link>
//         </motion.div>
//       </section>

//     </div>
//   );
// }

// export default HomePage;

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  LuTruck, LuPackage, LuMapPin, LuDollarSign, LuShieldCheck,
  LuClock, LuUsers, LuArrowRight, LuZap
} from 'react-icons/lu'; // Icons for the new sections

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

function HomePage() {
  const videoUrl = "https://cardvalid.vercel.app/herovideo.mp4";

  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

      {/* Hero Section - Elevated from previous HeroSection.js */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden px-4">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline // Important for iOS autoplay
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Background Overlay - Now on top of the video, but behind content */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 to-purple-900 dark:from-indigo-900 dark:to-purple-950 opacity-90 z-10"></div> */}
        
        {/* Animated Background Shapes - Now on top of the overlay, but still behind main content */}
        {/* <motion.div
          className="absolute inset-0 z-20" // Increased z-index
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-indigo-400 dark:bg-indigo-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-purple-400 dark:bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-400 dark:bg-blue-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </motion.div> */}

        {/* Content - Remains on top */}
        <div className="relative z-30 p-6 max-w-4xl mx-auto"> {/* Increased z-index */}
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg"
          >
            Your Global Shipping & Tracking Partner
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-indigo-100 mb-10 drop-shadow-md"
          >
            Track your packages worldwide with unparalleled accuracy, manage consignments, and get instant shipping quotes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              to="/consignment"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-700 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-lg"
            >
              <LuTruck className="h-6 w-6 mr-3" /> Track Your Package
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 text-lg border-2 border-indigo-600 hover:border-indigo-700"
            >
              <LuPackage className="h-6 w-6 mr-3" /> Get a Shipping Quote
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-100 dark:bg-gray-850">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white text-center mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          How It Works
        </motion.h2>
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={sectionVariants} // Apply stagger to children
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl text-center border border-gray-100 dark:border-gray-700" variants={itemVariants}>
            <div className="flex items-center justify-center w-20 h-20 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full mx-auto mb-6 text-4xl font-bold">1</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Place Your Order</h3>
            <p className="text-gray-700 dark:text-gray-300">Easily create new shipping orders and get instant quotes.</p>
          </motion.div>
          <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl text-center border border-gray-100 dark:border-gray-700" variants={itemVariants}>
            <div className="flex items-center justify-center w-20 h-20 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full mx-auto mb-6 text-4xl font-bold">2</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Track Real-time</h3>
            <p className="text-gray-700 dark:text-gray-300">Receive live updates on your package's journey, from origin to destination.</p>
          </motion.div>
          <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl text-center border border-gray-100 dark:border-gray-700" variants={itemVariants}>
            <div className="flex items-center justify-center w-20 h-20 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full mx-auto mb-6 text-4xl font-bold">3</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Guaranteed Delivery</h3>
            <p className="text-gray-700 dark:text-gray-300">Rest assured knowing your package will arrive safely and on time.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50 dark:bg-gray-900">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white text-center mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Our Core Services
        </motion.h2>
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl text-center border border-gray-100 dark:border-gray-700 hover:scale-[1.02] transition-transform duration-300" variants={itemVariants}>
            <LuMapPin className="h-16 w-16 text-indigo-600 dark:text-indigo-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Global Package Tracking</h3>
            <p className="text-gray-700 dark:text-gray-300">Track parcels from over 1000 carriers worldwide with real-time updates and detailed history.</p>
            <Link to="/track" className="mt-4 inline-flex items-center text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"> {/* Changed to /track */}
              Learn More <LuArrowRight className="ml-1" />
            </Link>
          </motion.div>
          <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl text-center border border-gray-100 dark:border-gray-700 hover:scale-[1.02] transition-transform duration-300" variants={itemVariants}>
            <LuTruck className="h-16 w-16 text-green-600 dark:text-green-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Consignment Management</h3>
            <p className="text-gray-700 dark:text-gray-300">Monitor large shipments and consignments with detailed sender/receiver info and progress maps.</p>
            <Link to="/consignment" className="mt-4 inline-flex items-center text-green-600 dark:text-green-400 font-semibold hover:underline">
              Learn More <LuArrowRight className="ml-1" />
            </Link>
          </motion.div>
          <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl text-center border border-gray-100 dark:border-gray-700 hover:scale-[1.02] transition-transform duration-300" variants={itemVariants}>
            <LuDollarSign className="h-16 w-16 text-purple-600 dark:text-purple-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Instant Shipping Quotes</h3>
            <p className="text-gray-700 dark:text-gray-300">Create new shipping orders and get live, competitive quotes for various service types.</p>
            <Link to="/shipping" className="mt-4 inline-flex items-center text-purple-600 dark:text-purple-400 font-semibold hover:underline"> {/* Changed to /shipping */}
              Learn More <LuArrowRight className="ml-1" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-100 dark:bg-gray-850">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white text-center mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Why Choose Global Tracker?
        </motion.h2>
        <motion.div
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl flex items-start space-x-6 border border-gray-100 dark:border-gray-700" variants={itemVariants}>
            <LuShieldCheck className="h-14 w-14 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Unmatched Reliability</h3>
              <p className="text-gray-700 dark:text-gray-300">Our robust infrastructure ensures your data is always accurate and secure, providing peace of mind with every shipment.</p>
            </div>
          </motion.div>
          <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl flex items-start space-x-6 border border-gray-100 dark:border-gray-700" variants={itemVariants}>
            <LuClock className="h-14 w-14 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Real-time Efficiency</h3>
              <p className="text-gray-700 dark:text-gray-300">Get instant updates and live quotes, saving you time and keeping you informed at every stage.</p>
            </div>
          </motion.div>
          <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl flex items-start space-x-6 border border-gray-100 dark:border-gray-700" variants={itemVariants}>
            <LuUsers className="h-14 w-14 text-lime-600 dark:text-lime-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Dedicated Support</h3>
              <p className="text-gray-700 dark:text-gray-300">Our expert customer service team is always ready to assist you with any query or challenge.</p>
            </div>
          </motion.div>
          <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl flex items-start space-x-6 border border-gray-100 dark:border-gray-700" variants={itemVariants}>
            <LuZap className="h-14 w-14 text-fuchsia-600 dark:text-fuchsia-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Seamless Integration</h3>
              <p className="text-gray-700 dark:text-gray-300">Our platform is designed for ease of use, providing a smooth and intuitive experience for all your logistics needs.</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Final Call-to-Action Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-indigo-600 to-purple-700 dark:from-indigo-800 dark:to-purple-900 text-white text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Ready to Simplify Your Logistics?
          </h2>
          <p className="text-xl md:text-2xl text-indigo-100 mb-10">
            Join thousands of satisfied users who trust Global Tracker for their shipping and tracking needs.
          </p>
          <Link
            to="/" 
            className="inline-flex items-center justify-center px-10 py-5 bg-white text-indigo-700 font-bold rounded-full shadow-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-xl"
          >
            <LuPackage className="h-7 w-7 mr-3" /> Get Started Today
          </Link>
        </motion.div>
      </section>

    </div>
  );
}

export default HomePage;