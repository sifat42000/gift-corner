import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { BackToTop } from '../components/BackToTop';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from 'react-hot-toast';

export const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-stone-900">
      <ScrollToTop />
      <Toaster 
        position="top-center"
        toastOptions={{
          className: 'rounded-2xl border border-stone-100 bg-white p-4 text-sm font-medium text-stone-900 shadow-xl',
          duration: 3000,
        }}
      />
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
};

