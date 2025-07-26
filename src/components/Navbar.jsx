import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // useLocation to highlight active link
import { motion } from 'framer-motion';
import { LuMenu, LuX, LuSun, LuMoon, LuPackage } from 'react-icons/lu'; // React Icons for menu, close, sun, moon, and logo
import logo from "../assets/logo.png"; // Import logo if needed
import express from "../assets/expresslano.png"; // Import logo if needed

function Navbar({ darkMode, toggleDarkMode }) {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle
  const location = useLocation(); // Hook to get current path

  const navItems = [
    { name: 'Home', path: '/' },
    // { name: 'Track', path: '/track' },
    { name: 'Consignment', path: '/consignment' },
    // { name: 'Shipping', path: '/shipping' },
    { name: 'Contact', path: '/contact' },
    { name: 'About Us', path: '/about' },
    // { name: 'Blog', path: '/blog' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md dark:shadow-xl sticky top-0 z-40 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Site Title */}
        <Link to="/" className="flex items-center space-x-2">
          <motion.span
            className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img src={express} alt="ExpressLano Logo" className="w-24 h-12 md:h-18 md:w-52 object-cover" />
            {/* <img src={logo} alt="ExpressLano Logo" className="block md:hidden h-8 w-16 object-contain" /> */}
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-7">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`
                text-gray-600 dark:text-gray-300 font-medium transition-colors duration-200
                hover:text-indigo-600 dark:hover:text-indigo-300
                ${location.pathname === item.path ? 'text-indigo-700 dark:text-white font-semibold border-b-2 border-indigo-600 dark:border-white pb-1' : ''}
              `}
            >
              {item.name}
            </Link>
          ))}
          {/* Dark Mode Toggle */}
          {/* <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <LuSun className="h-5 w-5" />
            ) : (
              <LuMoon className="h-5 w-5" />
            )}
          </button> */}
        </div>

        {/* Mobile Menu Button and Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          {/* <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <LuSun className="h-5 w-5" />
            ) : (
              <LuMoon className="h-5 w-5" />
            )}
          </button> */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle mobile menu"
          >
            {isOpen ? (
              <LuX className="h-7 w-7" />
            ) : (
              <LuMenu className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 }
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`
                block px-3 py-2 rounded-md text-base font-medium
                text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700
                hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors duration-200
                ${location.pathname === item.path ? 'bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-white font-semibold' : ''}
              `}
              onClick={() => setIsOpen(false)} // Close menu on link click
            >
              {item.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}

export default Navbar;