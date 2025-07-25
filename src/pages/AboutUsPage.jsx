import React from 'react';
import { motion } from 'framer-motion';
import { LuUsers, LuLightbulb, LuQuote, LuStar } from 'react-icons/lu'; // React Icons

// Mock Testimonials
const testimonials = [
  {
    id: 1,
    quote: "Global Tracker has revolutionized our supply chain. Their tracking is incredibly accurate, and their service is unparalleled!",
    author: "Sarah Chen",
    title: "Logistics Manager at Tech Innovations",
    rating: 5,
  },
  {
    id: 2,
    quote: "I never worry about my international packages anymore. The updates are timely, and the support team is always helpful.",
    author: "Mark Johnson",
    title: "Small Business Owner",
    rating: 5,
  },
  {
    id: 3,
    quote: "The consignment tracking feature saved us so much time. We can now give our clients precise delivery estimates.",
    author: "Emily White",
    title: "E-commerce Operations Lead",
    rating: 4,
  },
];

function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white text-center mb-10 md:mb-12"
      >
        About Us
      </motion.h2>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <LuUsers className="mr-3 h-7 w-7 text-indigo-600 dark:text-indigo-400" /> Our Story
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Founded in 20XX, Global Package Tracker was born out of a simple idea: to make global shipping and tracking transparent, efficient, and accessible to everyone. We noticed the complexities and uncertainties in international logistics and set out to build a platform that simplifies every step of the journey, from a single package to large consignments.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Over the years, we've grown into a trusted partner for individuals and businesses worldwide, leveraging cutting-edge technology and a dedicated team to deliver peace of mind with every shipment.
          </p>
        </motion.div>

        {/* Our Vision */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <LuLightbulb className="mr-3 h-7 w-7 text-indigo-600 dark:text-indigo-400" /> Our Vision
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Our vision is to be the leading global logistics intelligence platform, empowering businesses and individuals with real-time insights, predictive analytics, and seamless shipping solutions. We aim to continuously innovate, reduce logistical friction, and contribute to a more interconnected and efficient global trade ecosystem.
          </p>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <LuQuote className="mr-3 h-7 w-7 text-indigo-600 dark:text-indigo-400" /> What Our Clients Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-600 flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-yellow-400 mb-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <LuStar key={i} className="h-5 w-5 fill-current" />
                    ))}
                    {Array.from({ length: 5 - testimonial.rating }).map((_, i) => (
                      <LuStar key={i + testimonial.rating} className="h-5 w-5" />
                    ))}
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 italic mb-4">"{testimonial.quote}"</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AboutUsPage;