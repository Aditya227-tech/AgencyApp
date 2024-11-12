// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';


// Animation variants
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const scaleUp = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5 }
};

// Animated Logo Component
const AnimatedLogo = () => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1, rotate: 360 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
    className="text-2xl font-bold"
  >
    Agency
  </motion.div>
);

// Layout Component with Navigation
const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ['Home', 'Portfolio', 'Contact'];

  return (
    <div className="min-h-screen">
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed top-0 w-full bg-black/90 text-white z-50 p-4"
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/">
            <AnimatedLogo />
          </Link>

          <motion.button 
            className="md:hidden"
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <motion.path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                initial={false}
                animate={{ d: isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16" }}
                transition={{ duration: 0.3 }}
              />
            </svg>
          </motion.button>

          <div className="hidden md:flex space-x-6">
            {menuItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="hover:text-blue-400 transition-colors relative group"
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-400"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-full left-0 w-full bg-black/90"
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="block px-4 py-2 hover:bg-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      <main className="pt-16">{children}</main>
    </div>
  );
};

// Home Page
const Home = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      {/* Hero Section */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="text-center text-white px-4">
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            Creative Digital Solutions
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-8"
          >
            Video • Design • Marketing
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/portfolio">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50">
                View Our Work
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 px-4 bg-gray-100">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-12"
          >
            Our Services
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Video Production', 'Graphic Design', 'Digital Marketing'].map((service, index) => (
              <motion.div
                key={service}
                variants={scaleUp}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-bold mb-2">{service}</h3>
                <p className="text-gray-600">Professional {service.toLowerCase()} services</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Portfolio Page with Grid Animation
const Portfolio = () => {
  const projects = [
    { title: 'Brand Campaign', category: 'Marketing', image: '/api/placeholder/400/300' },
    { title: 'Product Launch', category: 'Video', image: '/api/placeholder/400/300' },
    { title: 'Website Design', category: 'Design', image: '/api/placeholder/400/300' },
    { title: 'Social Media', category: 'Marketing', image: '/api/placeholder/400/300' },
    { title: 'Corporate Video', category: 'Video', image: '/api/placeholder/400/300' },
    { title: 'App Design', category: 'Design', image: '/api/placeholder/400/300' },
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="container mx-auto px-4 py-12"
    >
      <motion.h1
        variants={fadeInUp}
        className="text-4xl font-bold mb-12 text-center"
      >
        Our Work
      </motion.h1>
      <motion.div
        variants={staggerContainer}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={scaleUp}
            whileHover={{ scale: 1.05 }}
            className="relative overflow-hidden rounded-lg shadow-lg"
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-64 object-cover"
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center"
            >
              <div className="text-center text-white">
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl font-bold"
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {project.category}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

// Contact Page with Form Animations
const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! (Demo only)');
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="container mx-auto px-4 py-12"
    >
      <motion.h1
        variants={fadeInUp}
        className="text-4xl font-bold mb-12 text-center"
      >
        Contact Us
      </motion.h1>
      <motion.form
        variants={scaleUp}
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto space-y-6"
      >
        {[
          { label: 'Name', type: 'text' },
          { label: 'Email', type: 'email' },
          { label: 'Message', type: 'textarea' }
        ].map((field, index) => (
          <motion.div
            key={field.label}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <label className="block text-gray-700 mb-2">{field.label}</label>
            {field.type === 'textarea' ? (
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                className="w-full p-2 border rounded-lg h-32"
                required
              />
            ) : (
              <motion.input
                type={field.type}
                whileFocus={{ scale: 1.02 }}
                className="w-full p-2 border rounded-lg"
                required
              />
            )}
          </motion.div>
        ))}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          type="submit"
        >
          Send Message
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

// Main App Component with Page Transitions
const AppContent = () => {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;