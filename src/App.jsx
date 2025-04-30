import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import MenuPopup from './components/menupopup';
import HomePage from './components/home';
import RegPage from './components/reg';
import UsersPage from './components/logs';


function App() {
  
  const location = useLocation();

  const pageVariants = {
    initial: { y: 30, opacity: 0 },
    in: { y: 0, opacity: 1 },
    out: { y: -30, opacity: 0 }
  };
  
  const pageTransition = {
    type: "spring",
    mass: 0.5,
    damping: 15,
    stiffness: 100
  };

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <nav>
            <a href="#" className="logo">&#128223; SweetSpot</a>
            <ul className="nav-links">
              <li><MenuPopup /></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <HomePage />
              </motion.div>
            } />
            <Route path="/register" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <RegPage />
              </motion.div>
            } />
            <Route path="/users" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <UsersPage />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </main>

      <footer className="footer">
        <div className="container">
          <p>Team Local | Smart Parking System | BSIT - 3A</p>
        </div>
      </footer>
    </div>
  );
}

export default App;