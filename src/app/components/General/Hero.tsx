"use client";

import { motion } from 'framer-motion';
import React from 'react';

const Hero = () => {
  return (
    <section className="relative flex items-center justify-between min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/path-to-your-image.jpg)' }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full px-6 py-12 max-w-7xl mx-auto">
        
        {/* Left: Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.2 }}
          className="flex flex-col items-start text-white md:w-1/2 space-y-6"
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-4xl md:text-6xl font-bold"
          >
            Welcome to <span className="text-blue-400">Talkies</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1.2 }}
            className="text-lg md:text-2xl"
          >
            Bringing you the finest cinema experiences, one screen at a time.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="px-8 py-3 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 focus:outline-none"
          >
            Explore Now
          </motion.button>
        </motion.div>

        {/* Right: Video Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 1, duration: 1.2 }}
          className="mt-10 md:mt-0 md:w-1/2 flex items-center justify-center"
        >
          <video className="rounded-lg shadow-lg w-full md:w-3/4" autoPlay muted loop>
            <source src="/path-to-your-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
