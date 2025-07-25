import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuCalendar, LuTag, LuArrowLeft } from 'react-icons/lu';

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


function ArticleDetailPage() {
  const { articleId } = useParams(); // Get the article ID from the URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Simulate fetching data based on articleId
    setLoading(true);
    setError(false);
    const foundArticle = mockBlogPosts.find(post => post.id === articleId);

    if (foundArticle) {
      setArticle(foundArticle);
    } else {
      setError(true);
    }
    setLoading(false);
  }, [articleId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-gray-600 dark:text-gray-400 text-lg">
        Loading article...
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-red-600 dark:text-red-400 mb-6"
        >
          Article Not Found
        </motion.h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
          The article you are looking for does not exist or has been moved.
        </p>
        <Link to="/blog" className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
          <LuArrowLeft className="mr-2" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="container mx-auto px-4 py-12 md:py-16 max-w-4xl"
    >
      <Link to="/blog" className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:underline mb-8">
        <LuArrowLeft className="mr-2" /> Back to Blog
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-80 object-cover"
        />
        <div className="p-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-8 space-x-5">
            <span className="flex items-center">
              <LuCalendar className="mr-2 h-4 w-4 text-indigo-500" /> {article.date}
            </span>
            <span className="flex items-center">
              <LuTag className="mr-2 h-4 w-4 text-indigo-500" /> {article.category}
            </span>
          </div>

          {/* Render HTML content from mock data */}
          <div
            className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default ArticleDetailPage;