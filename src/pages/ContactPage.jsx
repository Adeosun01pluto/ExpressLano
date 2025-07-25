import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LuMail, LuPhone, LuMessageCircle, LuSend, LuPin, LuLinkedin } from 'react-icons/lu'; // React Icons

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);

    try {
      // Simulate API call for form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // In a real app, you'd send formData to your backend here
      console.log('Form submitted:', formData);

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white text-center mb-10 md:mb-12"
      >
        Get in Touch
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Contact Information / Quick Links */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <LuPin className="mr-3 h-7 w-7 text-indigo-600 dark:text-indigo-400" /> Contact Details
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center mb-2">
                <LuMail className="mr-2 h-5 w-5 text-indigo-500" /> Email Us
              </h4>
              <p className="text-gray-600 dark:text-gray-400">For general inquiries, send us an email.</p>
              <a
                href="mailto:info@globaltracker.com"
                className="inline-flex items-center mt-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                <LuMail className="mr-2" /> info@globaltracker.com
              </a>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center mb-2">
                <LuMessageCircle className="mr-2 h-5 w-5 text-indigo-500" /> Live Chat / WhatsApp
              </h4>
              <p className="text-gray-600 dark:text-gray-400">Connect with us instantly via chat.</p>
              <a
                href="https://wa.me/1234567890" // Replace with actual WhatsApp link or chatbot embed
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-2 px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                <LuMessageCircle className="mr-2" /> Chat on WhatsApp
              </a>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center mb-2">
                <LuLinkedin className="mr-2 h-5 w-5 text-indigo-500" /> Follow Us
              </h4>
              <p className="text-gray-600 dark:text-gray-400">Stay updated on our social media.</p>
              <a
                href="https://linkedin.com/company/globaltracker" // Replace with actual LinkedIn
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-2 px-4 py-2 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors duration-200"
              >
                <LuLinkedin className="mr-2" /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <LuSend className="mr-3 h-7 w-7 text-indigo-600 dark:text-indigo-400" /> Send us a Message
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                required
              ></textarea>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <LuSend className="h-5 w-5 mr-2" />
              )}
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </motion.button>
            {submitSuccess && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center text-green-600 dark:text-green-400 font-medium"
              >
                Your message has been sent successfully!
              </motion.p>
            )}
            {submitError && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center text-red-600 dark:text-red-400 font-medium"
              >
                Failed to send message. Please try again later.
              </motion.p>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default ContactPage;