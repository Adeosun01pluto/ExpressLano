// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// // Import our public-facing components
// import Navbar from './components/Navbar';
// import HomePage from './pages/HomePage';
// import TrackPackagePage from './pages/TrackPackagePage';
// import ConsignmentPage from './pages/ConsignmentPage';
// import ShippingPage from './pages/ShippingPage';
// import ContactPage from './pages/ContactPage';
// import AboutUsPage from './pages/AboutUsPage';
// import BlogPage from './pages/BlogPage';
// import Footer from './components/Footer';             // NEW IMPORT
// import ArticleDetailPage from './pages/ArticleDetailPage'; // NEW IMPORT
// import AdminDashboardPage from './pages/AdminDashboardPage';
// import ScrollToTop from './components/ScrollToTop';

// // Import our Admin components

// function App() {
//   const [darkMode, setDarkMode] = useState(false);

//   // Load dark mode preference from local storage on mount
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme === 'dark') {
//       setDarkMode(true);
//       document.documentElement.classList.add('dark');
//     } else {
//       setDarkMode(false);
//       document.documentElement.classList.remove('dark');
//     }
//   }, []);

//   // Toggle dark mode and update local storage
//   const toggleDarkMode = () => {
//     setDarkMode(prevMode => {
//       const newMode = !prevMode;
//       if (newMode) {
//         document.documentElement.classList.add('dark');
//         localStorage.setItem('theme', 'dark');
//       } else {
//         document.documentElement.classList.remove('dark');
//         localStorage.setItem('theme', 'light');
//       }
//       return newMode;
//     });
//   };

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans flex flex-col"> {/* Added flex-col */}
//         {/* Place ScrollToTop directly inside Router */}
//         <ScrollToTop /> 
//         {/*
//           Conditional rendering of Navbar:
//           The public Navbar is not part of the Admin Dashboard layout.
//         */}
//         {!window.location.pathname.startsWith('/admin') && (
//           <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
//         )}

//         <main className="flex-grow"> {/* NEW: Main content wrapper */}
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/track" element={<TrackPackagePage />} />
//             <Route path="/consignment" element={<ConsignmentPage />} />
//             <Route path="/shipping" element={<ShippingPage />} />
//             <Route path="/contact" element={<ContactPage />} />
//             <Route path="/about" element={<AboutUsPage />} />
//             <Route path="/blog" element={<BlogPage />} />
//             {/* Dynamic route for individual blog posts */}
//             <Route path="/blog/:articleId" element={<ArticleDetailPage />} /> {/* NEW ROUTE */}

//             {/* Admin Dashboard Route */}
//             <Route path="/admin" element={<AdminDashboardPage />} />
//           </Routes>
//         </main>

//         {/* Footer is rendered only on public-facing pages */}
//         {!window.location.pathname.startsWith('/admin') && (
//           <Footer />
//         )}
//       </div>
//     </Router>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import our public-facing components
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TrackPackagePage from './pages/TrackPackagePage';
import ConsignmentPage from './pages/ConsignmentPage';
import ShippingPage from './pages/ShippingPage';
import ContactPage from './pages/ContactPage';
import AboutUsPage from './pages/AboutUsPage';
import BlogPage from './pages/BlogPage';
import Footer from './components/Footer';
import ArticleDetailPage from './pages/ArticleDetailPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminLoginPage from './pages/AdminLoginPage';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

// Import Authentication Context
import { AuthProvider } from './contexts/AuthContext';

// Component to handle conditional navbar rendering
const ConditionalNavbar = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  if (isAdminRoute) {
    return null;
  }
  
  return <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
};

// Component to handle conditional footer rendering
const ConditionalFooter = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  if (isAdminRoute) {
    return null;
  }
  
  return <Footer />;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from local storage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle dark mode and update local storage
  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans flex flex-col">
          <ScrollToTop />
          
          {/* Conditional Navbar */}
          <ConditionalNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/track" element={<TrackPackagePage />} />
              <Route path="/consignment" element={<ConsignmentPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:articleId" element={<ArticleDetailPage />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminDashboardPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>

          {/* Conditional Footer */}
          <ConditionalFooter />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;