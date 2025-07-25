import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuCalendar, LuTag, LuArrowLeft } from 'react-icons/lu';
// Import ReactMarkdown

// Mock Blog Posts
const mockBlogPosts = [
  {
    id: 'post-1',
    title: 'The Future of Global Logistics: AI & Automation',
    date: 'July 10, 2025',
    category: 'Logistics Trends',
    imageUrl: 'https://via.placeholder.com/600x400/6366f1/ffffff?text=AI+Logistics',
    excerpt: 'Explore how artificial intelligence and automation are set to revolutionize the global supply chain, enhancing efficiency and accuracy...',
    link: '/blog/the-future-of-global-logistics-ai-automation',
    details: `
      ## The AI Revolution in Supply Chains

      Artificial intelligence (AI) and automation are no longer futuristic concepts; they are rapidly reshaping the global logistics landscape. From optimizing routes to predicting demand, AI-driven solutions are enhancing efficiency, accuracy, and overall operational resilience.

      ### Predictive Analytics for Demand Forecasting
      One of the most significant impacts of AI is in predictive analytics. By analyzing vast datasets, including historical sales, weather patterns, economic indicators, and even social media trends, AI algorithms can forecast demand with remarkable precision. This allows companies to optimize inventory levels, reduce waste, and ensure products are available where and when they are needed.

      ### Automated Warehousing and Robotics
      Warehouses are becoming increasingly automated. Robotic process automation (RPA) handles repetitive tasks like picking, packing, and sorting, dramatically increasing throughput and reducing human error. Autonomous mobile robots (AMRs) navigate warehouses, transporting goods, while AI-powered vision systems ensure quality control and inventory accuracy.

      ### Route Optimization and Fleet Management
      AI algorithms can process real-time traffic data, weather conditions, and delivery schedules to calculate the most efficient routes, saving fuel and reducing delivery times. This extends to dynamic fleet management, where AI can assign vehicles, monitor driver performance, and even predict maintenance needs.

      ### Enhanced Security and Fraud Detection
      AI can analyze patterns in shipping data to identify potential security threats or fraudulent activities. This includes monitoring for suspicious packages, unusual routes, or anomalies in transaction data, providing an extra layer of protection for valuable goods.

      ### The Human Element
      While AI and automation are transforming operations, the human element remains crucial. AI empowers logistics professionals with better data and tools, allowing them to make more strategic decisions, focus on complex problem-solving, and provide superior customer service. The future of logistics is a collaborative one, where humans and intelligent machines work in synergy.

      The journey towards a fully intelligent supply chain is ongoing, but the benefits are clear: reduced costs, faster deliveries, improved customer satisfaction, and a more sustainable global logistics network. Global Tracker is committed to integrating these advancements to provide you with cutting-edge shipping solutions.
    `,
  },
  {
    id: 'post-2',
    title: 'Navigating Customs: A Guide for International Shippers',
    date: 'June 28, 2025',
    category: 'Shipping Guides',
    imageUrl: 'https://via.placeholder.com/600x400/3b82f6/ffffff?text=Customs+Guide',
    excerpt: 'International shipping can be complex. This guide breaks down common customs procedures and tips to ensure smooth deliveries...',
    link: '/blog/navigating-customs-guide-international-shippers',
    details: `
      ## A Smooth Journey Through Customs

      International shipping is a cornerstone of global trade, but it comes with its unique set of challenges, particularly when navigating customs procedures. Understanding these regulations is key to avoiding delays, unexpected costs, and legal complications.

      ### Key Concepts to Master:

      1.  **HS Codes (Harmonized System Codes):**
          * Every product has a unique six-digit (or more, depending on the country) classification code. This code determines tariffs, taxes, and any necessary restrictions or permits. Incorrect HS codes are a common cause of customs delays. Always use the most accurate code for your goods.

      2.  **Commercial Invoice:**
          * This document is critical. It must accurately describe the goods, their value, origin, terms of sale (Incoterms), and sender/receiver details. Any discrepancies can lead to hold-ups.

      3.  **Packing List:**
          * Details the contents of each package within a shipment, including quantity, weight, and dimensions. It helps customs officials verify the contents against the commercial invoice.

      4.  **Certificate of Origin:**
          * Certifies where the goods were manufactured. This can be important for determining eligibility for preferential tariffs under free trade agreements.

      5.  **Incoterms (International Commercial Terms):**
          * These globally recognized terms define the responsibilities of buyers and sellers for the delivery of goods under sales contracts. They cover who is responsible for costs, insurance, and risk at various points in the shipping journey (e.g., EXW, FOB, DDP). Choosing the right Incoterm is vital.

      ### Tips for a Seamless Customs Process:

      * **Accuracy is Paramount:** Double-check all documentation for accuracy and completeness. Small errors can cause significant delays.
      * **Know Your Product Restrictions:** Research any import/export restrictions or prohibitions for your specific product in both the origin and destination countries. Some items require special licenses or permits.
      * **Customs Duties and Taxes:** Be aware of potential duties, taxes, and other fees that may be levied by the destination country. Clearly communicate who is responsible for these costs (sender or receiver) to avoid surprises.
      * **Work with Experienced Partners:** Partnering with a logistics provider like Global Tracker, which has extensive experience in international shipping, can help you navigate these complexities. We can offer guidance and ensure your documentation is compliant.
      * **Pre-Clearance Options:** In some cases, pre-clearance options may be available, allowing customs processes to begin before the goods even arrive, speeding up delivery.

      By proactively preparing and understanding these aspects of customs, you can significantly streamline your international shipments and ensure your packages reach their destination without unnecessary hurdles.
    `,
  },
  {
    id: 'post-3',
    title: 'Quarterly Shipping Update: Key Trends & Challenges',
    date: 'June 15, 2025',
    category: 'Company Updates',
    imageUrl: 'https://via.placeholder.com/600x400/a855f7/ffffff?text=Shipping+Update',
    excerpt: 'Our latest report on the global shipping industry highlights emerging trends, challenges, and our strategic responses for Q2...',
    link: '/blog/quarterly-shipping-update-key-trends-challenges',
    details: `
      ## Global Shipping in Q2 2025: A Landscape of Dynamic Change

      The second quarter of 2025 presented a complex yet opportunities-filled environment for global shipping. Here's a brief overview of the key trends and challenges we observed, and how Global Tracker is adapting to serve you better.

      ### Emerging Trends:

      * **Continued E-commerce Boom:** Online retail shows no signs of slowing down, driving sustained demand for last-mile delivery and efficient fulfillment services. We're investing in enhanced delivery networks to support this growth.
      * **Focus on Resilient Supply Chains:** Geopolitical shifts and past disruptions have pushed businesses to prioritize supply chain resilience. This means diversifying sourcing, nearshoring, and building redundancy. Global Tracker is expanding its network of partners to offer more flexible routes.
      * **Green Logistics Momentum:** Sustainability remains a top priority. Customers and regulators alike are demanding greener shipping options. Our fleet optimization and exploration of alternative fuels are key initiatives in this area.
      * **Data-Driven Decision Making:** The adoption of advanced analytics and AI for logistics planning, inventory management, and route optimization is accelerating, leading to more intelligent and efficient operations.

      ### Key Challenges:

      * **Rising Fuel Costs:** Volatility in global energy markets continues to impact shipping costs. We are proactively implementing fuel efficiency measures and optimizing routes to mitigate these impacts.
      * **Labor Shortages:** The logistics industry faces ongoing challenges in recruiting and retaining skilled labor, from truck drivers to warehouse staff. We are focusing on employee development and automation to address this.
      * **Geopolitical Uncertainties:** Trade tensions, sanctions, and regional conflicts can disrupt established routes and create new complexities. Our dedicated risk assessment teams continuously monitor the global landscape to provide alternative solutions when needed.
      * **Port Congestion:** While improving in some regions, occasional port congestion still poses challenges, leading to potential delays. We leverage real-time data to anticipate and avoid congested areas where possible.

      ### Global Tracker's Response:

      At Global Tracker, we are committed to turning challenges into opportunities. We are:
      * **Investing in Technology:** Enhancing our tracking systems, implementing AI for efficiency, and strengthening our cybersecurity.
      * **Expanding Our Network:** Forging new partnerships and expanding our reach to offer more robust and redundant shipping options.
      * **Prioritizing Sustainability:** Doubling down on efforts to reduce our environmental footprint across all operations.
      * **Customer-Centric Innovation:** Continuously listening to your feedback and developing new services to meet your evolving shipping needs.

      We remain dedicated to providing reliable, efficient, and transparent shipping solutions in an ever-changing world.
    `,
  },
  {
    id: 'post-4',
    title: 'Sustainable Shipping: Our Commitment to Green Logistics',
    date: 'May 30, 2025',
    category: 'Sustainability',
    imageUrl: 'https://via.placeholder.com/600x400/22c55e/ffffff?text=Green+Logistics',
    excerpt: 'Learn about Global Tracker\'s initiatives to reduce our carbon footprint and promote environmentally friendly shipping practices...',
    link: '/blog/sustainable-shipping-green-logistics',
    details: `
      ## Charting a Greener Course: Global Tracker's Sustainable Shipping Initiatives

      At Global Tracker, we believe that delivering packages shouldn't come at the expense of our planet. As a leading logistics provider, we recognize our responsibility to minimize our environmental impact and contribute to a more sustainable future. Our commitment to "Green Logistics" is embedded in our operations and long-term strategy.

      ### Our Pillars of Sustainability:

      1.  **Optimized Route Planning:**
          * We leverage advanced algorithms and real-time data to plan the most fuel-efficient routes for our fleet. This not only reduces carbon emissions but also saves time and resources. Less time on the road means less pollution.

      2.  **Fleet Modernization:**
          * We are continually investing in modern vehicles that meet the latest emission standards. This includes exploring and integrating electric vehicles (EVs) and alternative fuel options into our urban and regional delivery networks where feasible.

      3.  **Efficient Warehousing and Packaging:**
          * Our warehouses are designed with energy efficiency in mind, utilizing LED lighting, optimized heating/cooling systems, and smart energy management.
          * We encourage the use of recyclable and biodegradable packaging materials and optimize package dimensions to reduce wasted space during transit, which in turn reduces the number of vehicles needed.

      4.  **Carbon Offset Programs:**
          * For emissions that are currently unavoidable, we actively participate in and support certified carbon offset programs. These programs invest in projects that reduce greenhouse gas emissions elsewhere, such as renewable energy initiatives or reforestation efforts.

      5.  **Partnerships for Change:**
          * We collaborate with suppliers, customers, and industry organizations who share our commitment to sustainability. By working together, we can drive broader changes across the supply chain.

      6.  **Employee Engagement:**
          * Our teams are educated and encouraged to adopt sustainable practices in their daily work, from waste reduction to energy conservation. Sustainability is a collective effort.

      ### Looking Ahead:

      Our journey towards full sustainability is continuous. We are constantly researching new technologies, refining our processes, and setting ambitious goals for emission reduction. By choosing Global Tracker, you are partnering with a company that is not only dedicated to efficient delivery but also to protecting the environment for future generations. Together, we can make every shipment a step towards a greener planet.
    `,
  },
  {
    id: 'post-5',
    title: 'Package Security: Protecting Your Shipments from Theft',
    date: 'May 10, 2025',
    category: 'Security Tips',
    imageUrl: 'https://via.placeholder.com/600x400/ef4444/ffffff?text=Package+Security',
    excerpt: 'Valuable insights and practical tips for ensuring the safety and security of your packages throughout their transit...',
    link: '/blog/package-security-protecting-your-shipments',
    details: `
      ## Safeguarding Your Shipments: A Guide to Package Security

      In an increasingly interconnected world, ensuring the security of your shipments from origin to destination is paramount. Package theft and damage can lead to significant financial losses and customer dissatisfaction. At Global Tracker, we prioritize the safety of your goods, and here are some insights and tips to enhance package security.

      ### Global Tracker's Security Measures:

      * **Secure Warehousing:** Our facilities are equipped with state-of-the-art surveillance systems, access controls, and 24/7 monitoring to protect packages during storage and transit.
      * **Trained Personnel:** All our staff undergo rigorous background checks and continuous training in secure handling and logistics protocols.
      * **Robust Tracking Systems:** Our real-time tracking provides unparalleled visibility, allowing you to monitor your package's journey and quickly identify any anomalies.
      * **Secure Transport:** We utilize secure vehicles and work with trusted carriers who adhere to strict security standards.

      ### Tips for Shippers:

      1.  **Secure Packaging:**
          * Use strong, durable boxes appropriate for the weight and contents.
          * Seal all seams with strong packing tape (H-taping method is recommended).
          * Avoid reusing old boxes with previous labels or barcodes.
          * For valuable items, consider double-boxing or using plain, unmarked boxes to avoid signaling valuable contents.

      2.  **Accurate Documentation:**
          * Ensure all shipping labels, commercial invoices, and customs declarations are accurate and clearly legible. Errors can lead to delays and increased risk of mishandling.

      3.  **Insurance for Valuables:**
          * For high-value shipments, always consider purchasing adequate shipping insurance. This provides financial protection against loss or damage during transit.

      4.  **Delivery Instructions:**
          * Provide clear and specific delivery instructions for the receiver. This can include "signature required" options, delivery to a secure location (e.g., mailroom, specific neighbor), or holding at a local pick-up point.

      5.  **Monitor Tracking:**
          * Regularly check the tracking updates for your package. Promptly report any unexpected delays or unusual activity to Global Tracker's customer service.

      ### Tips for Receivers:

      1.  **Prompt Retrieval:**
          * Retrieve packages as soon as possible after delivery. If you won't be home, arrange for a neighbor to pick it up or reschedule delivery.
      2.  **Secure Delivery Locations:**
          * If possible, have packages delivered to a secure location like a locked porch box, a work address, or a post office box.
      3.  **Sign for Deliveries:**
          * Opt for signature-required deliveries, especially for valuable items, to ensure the package is handed directly to a person.
      4.  **Install Security Cameras:**
          * Consider installing doorbell cameras or security cameras at your delivery point, which can deter thieves and provide evidence if theft occurs.

      By combining Global Tracker's robust security infrastructure with these practical tips, you can significantly enhance the safety and integrity of your shipments, ensuring peace of mind for both senders and receivers.
    `,
  },
  {
    id: 'post-6',
    title: 'Understanding Incoterms 2020: A Quick Reference',
    date: 'April 20, 2025',
    category: 'Shipping Regulations',
    imageUrl: 'https://via.placeholder.com/600x400/ec4899/ffffff?text=Incoterms+2020',
    excerpt: 'A concise guide to Incoterms 2020 and how these international trade terms impact your shipping responsibilities and costs...',
    link: '/blog/understanding-incoterms-2020',
    details: `
      ## Incoterms 2020: Decoding International Trade Terms

      Incoterms (International Commercial Terms) are a set of globally recognized rules published by the International Chamber of Commerce (ICC). They define the responsibilities of sellers and buyers for the delivery of goods under sales contracts. Understanding Incoterms 2020 is crucial for anyone involved in international trade, as they clarify who is responsible for costs, risks, and tasks at various stages of the shipping journey.

      ### Why are Incoterms Important?

      * **Clarity:** They prevent misunderstandings between buyers and sellers regarding responsibilities.
      * **Cost Allocation:** They specify which party pays for transportation, insurance, customs duties, and other charges.
      * **Risk Transfer:** They define the point at which the risk of loss or damage to goods transfers from the seller to the buyer.
      * **Compliance:** Using Incoterms correctly helps in compliance with international trade laws and customs regulations.

      ### Key Incoterms 2020 Explained (Commonly Used):

      Incoterms are generally divided into two main categories based on the mode of transport:

      #### **Rules for Any Mode or Modes of Transport:**

      1.  **EXW (Ex Works):**
          * **Seller's Responsibility:** Minimal. Goods are made available at the seller's premises.
          * **Buyer's Responsibility:** Maximum. Buyer bears all costs and risks from picking up goods at the seller's factory/warehouse.

      2.  **FCA (Free Carrier):**
          * **Seller's Responsibility:** Delivers goods to a carrier or another person nominated by the buyer at the seller's premises or another named place.
          * **Risk Transfer:** When goods are handed over to the carrier.

      3.  **CPT (Carriage Paid To):**
          * **Seller's Responsibility:** Pays for carriage to the named place of destination.
          * **Risk Transfer:** When goods are handed over to the first carrier. (Note: cost and risk transfer at different points).

      4.  **CIP (Carriage and Insurance Paid To):**
          * **Seller's Responsibility:** Same as CPT, but also pays for insurance against risk of loss/damage during carriage.
          * **Risk Transfer:** When goods are handed over to the first carrier.

      5.  **DAP (Delivered at Place):**
          * **Seller's Responsibility:** Delivers goods to the named place of destination, ready for unloading, but not cleared for import.
          * **Risk Transfer:** At the named place of destination when goods are ready for unloading.

      6.  **DPU (Delivered at Place Unloaded) - *New in Incoterms 2020, replaced DAT*:**
          * **Seller's Responsibility:** Delivers goods, unloaded, at the named place of destination.
          * **Risk Transfer:** Once goods are unloaded at the named place.

      7.  **DDP (Delivered Duty Paid):**
          * **Seller's Responsibility:** Maximum. Delivers goods to the named place of destination, cleared for import, and ready for unloading. Seller pays all duties and taxes.
          * **Buyer's Responsibility:** Minimal.

      #### **Rules for Sea and Inland Waterway Transport:**

      1.  **FAS (Free Alongside Ship):**
          * **Seller's Responsibility:** Delivers goods alongside the vessel at the named port of shipment.
          * **Risk Transfer:** When goods are alongside the ship.

      2.  **FOB (Free On Board):**
          * **Seller's Responsibility:** Delivers goods on board the vessel nominated by the buyer at the named port of shipment.
          * **Risk Transfer:** When goods are on board the vessel.

      3.  **CFR (Cost and Freight):**
          * **Seller's Responsibility:** Pays the cost and freight necessary to bring the goods to the named port of destination.
          * **Risk Transfer:** When goods are on board the vessel at the port of shipment.

      4.  **CIF (Cost, Insurance and Freight):**
          * **Seller's Responsibility:** Same as CFR, but also pays for insurance against the risk of loss or damage during carriage to the port of destination.
          * **Risk Transfer:** When goods are on board the vessel at the port of shipment.

      ### Using Incoterms Correctly:

      Always specify the Incoterm followed by the named place and "Incoterms 2020" (e.g., "FOB Port of Rotterdam, Incoterms 2020").

      Consulting with logistics experts like Global Tracker can help you choose the most appropriate Incoterm for your specific international shipments, ensuring clarity and minimizing risks.
    `,
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
    console.log(foundArticle)
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

          {article.details && ( // Only render if details exists
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {article.details}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ArticleDetailPage;