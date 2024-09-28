"use client";

import { motion } from 'framer-motion';
import React from 'react';

const PriceSection = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 text-white">Choose Your Plan</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-xl transform transition-all duration-300"
          >
            <div className="absolute inset-0 bg-blue-500 opacity-0 hover:opacity-20 transition duration-300 rounded-lg"></div>
            <h3 className="text-2xl font-semibold mb-4">Basic Plan</h3>
            <p className="text-gray-400 mb-6">Perfect for starters who want to test the platform.</p>
            <div className="text-4xl font-bold mb-6">$9<span className="text-lg">/mo</span></div>
            <ul className="mb-6 space-y-2">
              <li>✔️ Access to basic features</li>
              <li>✔️ Post and share anonymously</li>
              <li>✔️ 10 GB storage</li>
            </ul>
            <button className="px-6 py-3 bg-blue-500 rounded-md text-white hover:bg-blue-600 focus:outline-none">
              Get Started
            </button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-xl transform transition-all duration-300"
          >
            <div className="absolute inset-0 bg-green-500 opacity-0 hover:opacity-20 transition duration-300 rounded-lg"></div>
            <h3 className="text-2xl font-semibold mb-4">Pro Plan</h3>
            <p className="text-gray-400 mb-6">Great for regular creators who want more features.</p>
            <div className="text-4xl font-bold mb-6">$29<span className="text-lg">/mo</span></div>
            <ul className="mb-6 space-y-2">
              <li>✔️ All features from Basic Plan</li>
              <li>✔️ Unlimited posts and shares</li>
              <li>✔️ Priority support</li>
            </ul>
            <button className="px-6 py-3 bg-green-500 rounded-md text-white hover:bg-green-600 focus:outline-none">
              Go Pro
            </button>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-xl transform transition-all duration-300"
          >
            <div className="absolute inset-0 bg-purple-500 opacity-0 hover:opacity-20 transition duration-300 rounded-lg"></div>
            <h3 className="text-2xl font-semibold mb-4">Premium Plan</h3>
            <p className="text-gray-400 mb-6">For serious users who want the best experience.</p>
            <div className="text-4xl font-bold mb-6">$49<span className="text-lg">/mo</span></div>
            <ul className="mb-6 space-y-2">
              <li>✔️ All features from Pro Plan</li>
              <li>✔️ Unlimited everything</li>
              <li>✔️ Exclusive content creation tools</li>
            </ul>
            <button className="px-6 py-3 bg-purple-500 rounded-md text-white hover:bg-purple-600 focus:outline-none">
              Go Premium
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PriceSection;
