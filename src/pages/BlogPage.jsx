import React from 'react';
import { motion } from 'framer-motion';
import { LuNewspaper, LuCalendar, LuTag } from 'react-icons/lu'; // React Icons for blog elements
import { Link } from 'react-router-dom';
// Mock Blog Posts
const mockBlogPosts = [
  {
    id: 'post-1',
    title: 'The Future of Global Logistics: AI & Automation',
    date: 'July 10, 2025',
    category: 'Logistics Trends',
    imageUrl: 'https://via.placeholder.com/600x400/6366f1/ffffff?text=AI+Logistics',
    excerpt: 'Explore how artificial intelligence and automation are set to revolutionize the global supply chain, enhancing efficiency and accuracy...',
    link: '/blog/the-future-of-global-logistics-ai-automation'
  },
  {
    id: 'post-2',
    title: 'Navigating Customs: A Guide for International Shippers',
    date: 'June 28, 2025',
    category: 'Shipping Guides',
    imageUrl: 'https://via.placeholder.com/600x400/3b82f6/ffffff?text=Customs+Guide',
    excerpt: 'International shipping can be complex. This guide breaks down common customs procedures and tips to ensure smooth deliveries...',
    link: '/blog/navigating-customs-guide-international-shippers'
  },
  {
    id: 'post-3',
    title: 'Quarterly Shipping Update: Key Trends & Challenges',
    date: 'June 15, 2025',
    category: 'Company Updates',
    imageUrl: 'https://via.placeholder.com/600x400/a855f7/ffffff?text=Shipping+Update',
    excerpt: 'Our latest report on the global shipping industry highlights emerging trends, challenges, and our strategic responses for Q2...',
    link: '/blog/quarterly-shipping-update-key-trends-challenges'
  },
  {
    id: 'post-4',
    title: 'Sustainable Shipping: Our Commitment to Green Logistics',
    date: 'May 30, 2025',
    category: 'Sustainability',
    imageUrl: 'https://via.placeholder.com/600x400/22c55e/ffffff?text=Green+Logistics',
    excerpt: 'Learn about Global Tracker\'s initiatives to reduce our carbon footprint and promote environmentally friendly shipping practices...',
    link: '/blog/sustainable-shipping-green-logistics'
  },
  {
    id: 'post-5',
    title: 'Package Security: Protecting Your Shipments from Theft',
    date: 'May 10, 2025',
    category: 'Security Tips',
    imageUrl: 'https://via.placeholder.com/600x400/ef4444/ffffff?text=Package+Security',
    excerpt: 'Valuable insights and practical tips for ensuring the safety and security of your packages throughout their transit...',
    link: '/blog/package-security-protecting-your-shipments'
  },
  {
    id: 'post-6',
    title: 'Understanding Incoterms 2020: A Quick Reference',
    date: 'April 20, 2025',
    category: 'Shipping Regulations',
    imageUrl: 'https://via.placeholder.com/600x400/ec4899/ffffff?text=Incoterms+2020',
    excerpt: 'A concise guide to Incoterms 2020 and how these international trade terms impact your shipping responsibilities and costs...',
    link: '/blog/understanding-incoterms-2020'
  },
];


function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white text-center mb-10 md:mb-12"
      >
        Our Blog & Updates
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {mockBlogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden group hover:scale-[1.02] hover:shadow-2xl"
          >
            <Link to={post.id}>
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3 space-x-4">
                <span className="flex items-center">
                  <LuCalendar className="mr-1 h-4 w-4" /> {post.date}
                </span>
                <span className="flex items-center">
                  <LuTag className="mr-1 h-4 w-4" /> {post.category}
                </span>
              </div>
              <Link to={post.id}>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                  {post.title}
                </h3>
              </Link>
              <p className="text-gray-700 dark:text-gray-300 text-base mb-4">
                {post.excerpt}
              </p>
              <Link
                to={post.id}
                className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:underline transition-colors duration-200"
              >
                Read More
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {mockBlogPosts.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-10 text-lg">
          No blog posts available yet. Check back soon for updates!
        </p>
      )}
    </div>
  );
}

export default BlogPage;