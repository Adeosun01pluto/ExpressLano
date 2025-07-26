import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuMail, LuPhone, LuMapPin, LuLinkedin, LuTwitter, LuFacebook, LuGlobe } from 'react-icons/lu';
import express from "../assets/expresslanowhite.png"; // Import logo if needed

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-gray-800 dark:bg-gray-950 text-gray-300 dark:text-gray-400 py-12 md:py-16 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand Info */}
        <div className="col-span-1 md:col-span-1">
          {/* Logo and Site Title */}
                  <Link to="/" className="flex items-center">
                    <motion.span
                      className=""
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <img src={express} alt="ExpressLano Logo" className="w-48 h-24 md:h-18 md:w-52 object-cover" />
                      {/* <img src={logo} alt="ExpressLano Logo" className="block md:hidden h-8 w-16 object-contain" /> */}
                    </motion.span>
                  </Link>
          <p className="text-gray-400 dark:text-gray-500 text-sm leading-relaxed">
            Your trusted partner for global package tracking, seamless shipping, and comprehensive logistics solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-6">Quick Links</h4>
          <ul className="space-y-3 text-gray-400 dark:text-gray-500">
            <li><Link to="/consignment" className="hover:text-indigo-400 transition-colors duration-200">Track Your Package</Link></li>
            <li><Link to="/" className="hover:text-indigo-400 transition-colors duration-200">Get a Shipping Quote</Link></li>
            <li><Link to="/consignment" className="hover:text-indigo-400 transition-colors duration-200">Consignment</Link></li>
            <li><Link to="/blog" className="hover:text-indigo-400 transition-colors duration-200">Blog & Updates</Link></li>
            <li><Link to="/about" className="hover:text-indigo-400 transition-colors duration-200">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-400 transition-colors duration-200">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-6">Contact Info</h4>
          <ul className="space-y-4 text-gray-400 dark:text-gray-500">
            <li className="flex items-start">
              <LuMapPin className="h-5 w-5 mr-3 mt-1 flex-shrink-0 text-indigo-400" />
              <span>123 Global Way, Logistics City, GT 90210, World</span>
            </li>
            <li className="flex items-center">
              <LuPhone className="h-5 w-5 mr-3 text-indigo-400" />
              <a href="tel:+1234567890" className="hover:text-indigo-400 transition-colors duration-200">+1 (941)-2109-334</a>
            </li>
            <li className="flex items-center">
              <LuMail className="h-5 w-5 mr-3 text-indigo-400" />
              <a href="mailto:info@expresslano.com" className="hover:text-indigo-400 transition-colors duration-200">info@expresslano.com</a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-6">Follow Us</h4>
          <div className="flex space-x-5">
            <a href="https://linkedin.com/company/globaltracker" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">
              <LuLinkedin className="h-7 w-7" />
            </a>
            <a href="https://twitter.com/globaltracker" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">
              <LuTwitter className="h-7 w-7" />
            </a>
            <a href="https://facebook.com/globaltracker" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">
              <LuFacebook className="h-7 w-7" />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 dark:border-gray-800 mt-10 pt-8 text-center text-gray-500 dark:text-gray-600 text-sm">
        <p>&copy; {currentYear} GlobalTracker. All rights reserved.</p>
        <p className="mt-2">
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link> | <Link to="/terms" className="hover:underline">Terms of Service</Link>
        </p>
      </div>
    </motion.footer>
  );
}

export default Footer;