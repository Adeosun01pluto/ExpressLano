// // import React from 'react';
// // import { motion } from 'framer-motion';
// // import { Link } from 'react-router-dom';
// // import {
// //   LuTruck, LuPackage, LuMapPin, LuDollarSign, LuShieldCheck,
// //   LuClock, LuUsers, LuArrowRight, LuZap
// // } from 'react-icons/lu'; // Icons for the new sections

// // const sectionVariants = {
// //   hidden: { opacity: 0, y: 50 },
// //   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
// // };

// // const itemVariants = {
// //   hidden: { opacity: 0, scale: 0.8 },
// //   visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
// // };

// // function HomePage() {
// //   return (
// //     <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

// //       {/* Hero Section - Elevated from previous HeroSection.js */}
// //       <section className="relative h-screen flex items-center justify-center text-center overflow-hidden px-4">
// //         {/* Background Overlay */}
// //         <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 to-purple-900 dark:from-indigo-900 dark:to-purple-950 opacity-90"></div>
// //         {/* Animated Background Shapes */}
// //         <motion.div
// //           className="absolute inset-0 z-0"
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 0.3 }}
// //           transition={{ duration: 2, ease: "easeInOut" }}
// //         >
// //           <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-indigo-400 dark:bg-indigo-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
// //           <div className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-purple-400 dark:bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
// //           <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-400 dark:bg-blue-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
// //         </motion.div>

// //         {/* Content */}
// //         <div className="relative z-10 p-6 max-w-4xl mx-auto">
// //           <motion.h1
// //             initial={{ opacity: 0, y: -50 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 1, delay: 0.2 }}
// //             className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg"
// //           >
// //             Your Global Shipping & Tracking Partner
// //           </motion.h1>
// //           <motion.p
// //             initial={{ opacity: 0, y: 50 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 1, delay: 0.4 }}
// //             className="text-xl md:text-2xl text-indigo-100 mb-10 drop-shadow-md"
// //           >
// //             Track your packages worldwide with unparalleled accuracy, manage consignments, and get instant shipping quotes.
// //           </motion.p>
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.8 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
// //             className="flex flex-col sm:flex-row justify-center gap-4"
// //           >
// //             <Link
// //               to="/consignment"
// //               className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-700 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-lg"
// //             >
// //               <LuTruck className="h-6 w-6 mr-3" /> Track Your Package
// //             </Link>
// //             <Link
// //               to="/"
// //               className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 text-lg border-2 border-indigo-600 hover:border-indigo-700"
// //             >
// //               <LuPackage className="h-6 w-6 mr-3" /> Get a Shipping Quote
// //             </Link>
// //           </motion.div>
// //         </div>
// //       </section>

// //       {/* How It Works Section */}
// //       <section className="py-16 md:py-24 px-4 bg-gray-100 dark:bg-gray-850">
// //         <motion.h2
// //           className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white text-center mb-12"
// //           variants={sectionVariants}
// //           initial="hidden"
// //           whileInView="visible"
// //           viewport={{ once: true, amount: 0.3 }}
// //         >
// //           How It Works
// //         </motion.h2>
// //         <motion.div
// //           className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
// //           variants={sectionVariants} // Apply stagger to children
// //           initial="hidden"
// //           whileInView="visible"
// //           viewport={{ once: true, amount: 0.3 }}
// //         >
// //           <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl text-center border border-gray-100 dark:border-gray-700" variants={itemVariants}>
// //             <div className="flex items-center justify-center w-20 h-20 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full mx-auto mb-6 text-4xl font-bold">1</div>
// //             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Place Your Order</h3>
// //             <p className="text-gray-700 dark:text-gray-300">Easily create new shipping orders and get instant quotes.</p>
// //           </motion.div>
// //           <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl text-center border border-gray-100 dark:border-gray-700" variants={itemVariants}>
// //             <div className="flex items-center justify-center w-20 h-20 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full mx-auto mb-6 text-4xl font-bold">2</div>
// //             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Track Real-time</h3>
// //             <p className="text-gray-700 dark:text-gray-300">Receive live updates on your package's journey, from origin to destination.</p>
// //           </motion.div>
// //           <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl text-center border border-gray-100 dark:border-gray-700" variants={itemVariants}>
// //             <div className="flex items-center justify-center w-20 h-20 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full mx-auto mb-6 text-4xl font-bold">3</div>
// //             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Guaranteed Delivery</h3>
// //             <p className="text-gray-700 dark:text-gray-300">Rest assured knowing your package will arrive safely and on time.</p>
// //           </motion.div>
// //         </motion.div>
// //       </section>

// //       {/* Our Services Section */}
// //       <section className="py-16 md:py-24 px-4 bg-gray-50 dark:bg-gray-900">
// //         <motion.h2
// //           className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white text-center mb-12"
// //           variants={sectionVariants}
// //           initial="hidden"
// //           whileInView="visible"
// //           viewport={{ once: true, amount: 0.3 }}
// //         >
// //           Our Core Services
// //         </motion.h2>
// //         <motion.div
// //           className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
// //           variants={sectionVariants}
// //           initial="hidden"
// //           whileInView="visible"
// //           viewport={{ once: true, amount: 0.3 }}
// //         >
// //           <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl text-center border border-gray-100 dark:border-gray-700 hover:scale-[1.02] transition-transform duration-300" variants={itemVariants}>
// //             <LuMapPin className="h-16 w-16 text-indigo-600 dark:text-indigo-400 mx-auto mb-6" />
// //             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Global Package Tracking</h3>
// //             <p className="text-gray-700 dark:text-gray-300">Track parcels from over 1000 carriers worldwide with real-time updates and detailed history.</p>
// //             <Link to="/consignment" className="mt-4 inline-flex items-center text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
// //               Learn More <LuArrowRight className="ml-1" />
// //             </Link>
// //           </motion.div>
// //           <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl text-center border border-gray-100 dark:border-gray-700 hover:scale-[1.02] transition-transform duration-300" variants={itemVariants}>
// //             <LuTruck className="h-16 w-16 text-green-600 dark:text-green-400 mx-auto mb-6" />
// //             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Consignment Management</h3>
// //             <p className="text-gray-700 dark:text-gray-300">Monitor large shipments and consignments with detailed sender/receiver info and progress maps.</p>
// //             <Link to="/consignment" className="mt-4 inline-flex items-center text-green-600 dark:text-green-400 font-semibold hover:underline">
// //               Learn More <LuArrowRight className="ml-1" />
// //             </Link>
// //           </motion.div>
// //           <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl text-center border border-gray-100 dark:border-gray-700 hover:scale-[1.02] transition-transform duration-300" variants={itemVariants}>
// //             <LuDollarSign className="h-16 w-16 text-purple-600 dark:text-purple-400 mx-auto mb-6" />
// //             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Instant Shipping Quotes</h3>
// //             <p className="text-gray-700 dark:text-gray-300">Create new shipping orders and get live, competitive quotes for various service types.</p>
// //             <Link to="/" className="mt-4 inline-flex items-center text-purple-600 dark:text-purple-400 font-semibold hover:underline">
// //               Learn More <LuArrowRight className="ml-1" />
// //             </Link>
// //           </motion.div>
// //         </motion.div>
// //       </section>

// //       {/* Why Choose Us Section */}
// //       <section className="py-16 md:py-24 px-4 bg-gray-100 dark:bg-gray-850">
// //         <motion.h2
// //           className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white text-center mb-12"
// //           variants={sectionVariants}
// //           initial="hidden"
// //           whileInView="visible"
// //           viewport={{ once: true, amount: 0.3 }}
// //         >
// //           Why Choose Global Tracker?
// //         </motion.h2>
// //         <motion.div
// //           className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
// //           variants={sectionVariants}
// //           initial="hidden"
// //           whileInView="visible"
// //           viewport={{ once: true, amount: 0.3 }}
// //         >
// //           <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl flex items-start space-x-6 border border-gray-100 dark:border-gray-700" variants={itemVariants}>
// //             <LuShieldCheck className="h-14 w-14 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-1" />
// //             <div>
// //               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Unmatched Reliability</h3>
// //               <p className="text-gray-700 dark:text-gray-300">Our robust infrastructure ensures your data is always accurate and secure, providing peace of mind with every shipment.</p>
// //             </div>
// //           </motion.div>
// //           <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl flex items-start space-x-6 border border-gray-100 dark:border-gray-700" variants={itemVariants}>
// //             <LuClock className="h-14 w-14 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
// //             <div>
// //               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Real-time Efficiency</h3>
// //               <p className="text-gray-700 dark:text-gray-300">Get instant updates and live quotes, saving you time and keeping you informed at every stage.</p>
// //             </div>
// //           </motion.div>
// //           <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl flex items-start space-x-6 border border-gray-100 dark:border-gray-700" variants={itemVariants}>
// //             <LuUsers className="h-14 w-14 text-lime-600 dark:text-lime-400 flex-shrink-0 mt-1" />
// //             <div>
// //               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Dedicated Support</h3>
// //               <p className="text-gray-700 dark:text-gray-300">Our expert customer service team is always ready to assist you with any query or challenge.</p>
// //             </div>
// //           </motion.div>
// //           <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl flex items-start space-x-6 border border-gray-100 dark:border-gray-700" variants={itemVariants}>
// //             <LuZap className="h-14 w-14 text-fuchsia-600 dark:text-fuchsia-400 flex-shrink-0 mt-1" />
// //             <div>
// //               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Seamless Integration</h3>
// //               <p className="text-gray-700 dark:text-gray-300">Our platform is designed for ease of use, providing a smooth and intuitive experience for all your logistics needs.</p>
// //             </div>
// //           </motion.div>
// //         </motion.div>
// //       </section>

// //       {/* Final Call-to-Action Section */}
// //       <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-indigo-600 to-purple-700 dark:from-indigo-800 dark:to-purple-900 text-white text-center">
// //         <motion.div
// //           className="max-w-4xl mx-auto"
// //           variants={sectionVariants}
// //           initial="hidden"
// //           whileInView="visible"
// //           viewport={{ once: true, amount: 0.3 }}
// //         >
// //           <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
// //             Ready to Simplify Your Logistics?
// //           </h2>
// //           <p className="text-xl md:text-2xl text-indigo-100 mb-10">
// //             Join thousands of satisfied users who trust Global Tracker for their shipping and tracking needs.
// //           </p>
// //           <Link
// //             to="/"
// //             className="inline-flex items-center justify-center px-10 py-5 bg-white text-indigo-700 font-bold rounded-full shadow-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-xl"
// //           >
// //             <LuPackage className="h-7 w-7 mr-3" /> Get Started Today
// //           </Link>
// //         </motion.div>
// //       </section>

// //     </div>
// //   );
// // }

// // export default HomePage;

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
//   const videoUrl = "https://cardvalid.vercel.app/herovideo.mp4";

//   return (
//     <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

//       {/* Hero Section - Elevated from previous HeroSection.js */}
//       <section className="relative min-h-[80vh] md:h-screen flex items-center justify-center text-center overflow-hidden px-4">
//         {/* Background Video */}
//         <video
//           autoPlay
//           loop
//           muted
//           playsInline // Important for iOS autoplay
//           className="absolute inset-0 w-full h-full object-cover z-0"
//         >
//           <source src={videoUrl} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>

//         {/* Background Overlay - Now on top of the video, but behind content */}
//         {/* <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 to-purple-900 dark:from-indigo-900 dark:to-purple-950 opacity-90 z-10"></div> */}
        
//         {/* Animated Background Shapes - Now on top of the overlay, but still behind main content */}
//         {/* <motion.div
//           className="absolute inset-0 z-20" // Increased z-index
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 0.3 }}
//           transition={{ duration: 2, ease: "easeInOut" }}
//         >
//           <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-indigo-400 dark:bg-indigo-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
//           <div className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-purple-400 dark:bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
//           <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-400 dark:bg-blue-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
//         </motion.div> */}



//         {/* Content - Remains on top */}
//         <div className="relative z-30 p-6 max-w-4xl mx-auto"> {/* Increased z-index */}
//           <motion.h1
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.2 }}
//             className="text-3xl md:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg"
//           >
//             Your Global Shipping & Tracking Partner
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.4 }}
//             className="text-lg md:text-2xl text-indigo-100 mb-10 drop-shadow-md"
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
//             <Link to="/shipping" className="mt-4 inline-flex items-center text-purple-600 dark:text-purple-400 font-semibold hover:underline"> {/* Changed to /shipping */}
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
  LuClock, LuUsers, LuArrowRight, LuZap, LuGlobe, LuStar,
    LuHeadphones, LuLock
} from 'react-icons/lu';
import { IoBarChart } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";


const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: "easeOut",
      staggerChildren: 0.1
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    } 
  }
};

const floatAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

function HomePage() {
  const videoUrl = "https://cardvalid.vercel.app/herovideo.mp4";

  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

      {/* Hero Section */}
      <section className="relative pt-12 min-h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-purple-900/50 to-blue-900/60 z-20"></div>

        {/* Content */}
        <div className="relative z-30 px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium border border-white/20">
              🌍 Trusted by 50,000+ businesses worldwide
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-4xl md:text-7xl xl:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tight"
          >
            Ship.{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Track.
            </span>{' '}
            Deliver.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          >
            The world's most advanced logistics platform. Track packages from 1000+ carriers, 
            get instant quotes, and manage shipments with military-grade precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center md:items-center gap-6"
          >
            <Link
              to="/consignment"
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-white text-gray-900 font-bold rounded-2xl shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105 text-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center">
                <LuMapPin className="h-6 w-6 mr-3" /> Track Package
              </span>
            </Link>
            
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-10 py-5 bg-transparent text-white font-bold rounded-2xl border-2 border-white/30 backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300 transform hover:scale-105 text-lg"
            >
              <LuTruck className="h-6 w-6 mr-3" /> Get Quote
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 grid pb-6 grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-gray-300 font-medium">Global Carriers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-300 font-medium">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-300 font-medium">Expert Support</div>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={floatAnimation}
          className="absolute top-20 right-10 w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 hidden lg:block"
        />
        <motion.div
          animate={{ ...floatAnimation, transition: { ...floatAnimation.transition, delay: 1 } }}
          className="absolute bottom-32 left-16 w-16 h-16 bg-purple-500/20 rounded-full backdrop-blur-sm border border-purple-300/30 hidden lg:block"
        />
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10"></div>
        
        <motion.div
          className="max-w-7xl mx-auto relative z-10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="text-center mb-20">
            <motion.span 
              variants={itemVariants}
              className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold mb-4"
            >
               Why Choose Us
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight"
            >
              Built for Modern
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block">
                Logistics
              </span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Experience the next generation of shipping management with AI-powered tracking, 
              real-time analytics, and seamless integrations.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="group">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <LuGlobe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Global Network</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Connect with over 1000 carriers worldwide. From local deliveries to international freight, 
                  we've got every corner of the globe covered.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="group">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <LuZap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Lightning Fast</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Get instant quotes, real-time tracking updates, and automated notifications. 
                  Speed is in our DNA, efficiency is our promise.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="group">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <LuShieldCheck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Fort Knox Security</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Military-grade encryption, SOC 2 compliance, and zero-trust architecture. 
                  Your data is safer than a Swiss bank vault.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="group">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IoBarChart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Smart Analytics</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  AI-powered insights, predictive analytics, and custom dashboards. 
                  Turn your shipping data into competitive advantage.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="group">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <LuHeadphones className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">White Glove Support</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  24/7 human support from logistics experts. No chatbots, no waiting. 
                  Just real people solving real problems, instantly.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="group">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <LuLock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Enterprise Ready</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  API-first architecture, custom integrations, and enterprise SLAs. 
                  Scale from startup to Fortune 500 without breaking a sweat.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-800/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 dark:bg-purple-800/20 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          className="max-w-7xl mx-auto relative z-10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="text-center mb-20">
            <motion.span 
              variants={itemVariants}
              className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold mb-4"
            >
               Our Services
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight"
            >
              Everything You Need
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
                In One Platform
              </span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 h-full group hover:shadow-3xl transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <LuMapPin className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Global Tracking</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                  Track any package, anywhere in the world. Real-time updates, 
                  delivery predictions, and exception handling—all in one dashboard.
                </p>
                <Link 
                  to="/consignment" 
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-bold text-lg hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group"
                >
                  Start Tracking 
                  <LuArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 h-full group hover:shadow-3xl transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <LuTruck className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Smart Shipping</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                  AI-optimized routes, bulk management, and automated workflows. 
                  Handle everything from single packages to massive consignments.
                </p>
                <Link 
                  to="/consignment" 
                  className="inline-flex items-center text-green-600 dark:text-green-400 font-bold text-lg hover:text-green-700 dark:hover:text-green-300 transition-colors group"
                >
                  Manage Shipments 
                  <LuArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 h-full group hover:shadow-3xl transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <LuDollarSign className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Instant Quotes</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                  Get competitive rates from multiple carriers instantly. 
                  Compare services, delivery times, and costs—all in real-time.
                </p>
                <Link 
                  to="/shipping" 
                  className="inline-flex items-center text-purple-600 dark:text-purple-400 font-bold text-lg hover:text-purple-700 dark:hover:text-purple-300 transition-colors group"
                >
                  Get Quote 
                  <LuArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <motion.div
          className="max-w-5xl mx-auto text-center relative z-10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-7xl font-black mb-8 leading-tight"
          >
            Ready to Ship
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block">
              The Future?
            </span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Join 50,000+ businesses who've revolutionized their logistics with Global Tracker. 
            Your first 100 shipments are on us.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center md:items-center gap-6"
          >
            <Link
              to="/consignment"
              className="group relative inline-flex items-center justify-center px-12 py-6 bg-white text-gray-900 font-bold rounded-2xl shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105 text-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center">
                <LuPackage className="h-7 w-7 mr-3" /> Track Package
              </span>
            </Link>
            
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-12 py-6 bg-transparent text-white font-bold rounded-2xl border-2 border-white/30 backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300 transform hover:scale-105 text-xl"
            >
              <LuUsers className="h-7 w-7 mr-3" /> Talk to Sales
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex items-center justify-center gap-8 text-gray-300"
          >
            <div className="flex items-center md:flex-row flex-col gap-2">
              <FaRegCheckCircle className="h-5 w-5 text-green-400" />
              <span className='text-md'>No setup fees</span>
            </div>
            <div className="flex items-center md:flex-row flex-col gap-2">
              <FaRegCheckCircle className="h-5 w-5 text-green-400" />
              <span className='text-md'>Cancel anytime</span>
            </div>
            <div className="flex items-center md:flex-row flex-col gap-2">
              <FaRegCheckCircle className="h-5 w-5 text-green-400" />
              <span className='text-md'>24/7 support</span>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

export default HomePage;