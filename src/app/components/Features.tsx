"use client";

import { motion } from 'framer-motion';
import React from 'react';

const Features = () => {
  return (
    <section className="py-16 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-10"
        >
          Why Choose <span className="text-blue-500">Talkies</span>?
        </motion.h2>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ delay: 0.2, duration: 1 }} 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Feature 1: Stay Anonymous */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gray-100 rounded-lg shadow-md"
          >
            <h3 className="text-2xl font-semibold mb-4">Stay Anonymous</h3>
            <p className="text-gray-600">
              Your identity stays private. Share your thoughts without revealing
              personal details, letting your content speak for itself.
            </p>
          </motion.div>

          {/* Feature 2: Share & Earn */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gray-100 rounded-lg shadow-md"
          >
            <h3 className="text-2xl font-semibold mb-4">Share & Earn</h3>
            <p className="text-gray-600">
              Post your content, gain subscribers, and start earning. The more
              engagement you receive, the more you can monetize.
            </p>
          </motion.div>

          {/* Feature 3: Monthly Subscriptions */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gray-100 rounded-lg shadow-md"
          >
            <h3 className="text-2xl font-semibold mb-4">Subscription Tiers</h3>
            <p className="text-gray-600">
              Enjoy exclusive features and content through our monthly subscription
              plans. Get more benefits, including analytics, customization, and
              increased earning potential.
            </p>
          </motion.div>
        </motion.div>

        {/* Second row */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ delay: 0.4, duration: 1 }} 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10"
        >
          {/* Feature 4: Subscribers */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gray-100 rounded-lg shadow-md"
          >
            <h3 className="text-2xl font-semibold mb-4">Build Your Subscriber Base</h3>
            <p className="text-gray-600">
              Grow your audience by letting users subscribe to your content.
              Build a community of loyal followers who can support your journey.
            </p>
          </motion.div>

          {/* Feature 5: Detailed Analytics */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gray-100 rounded-lg shadow-md"
          >
            <h3 className="text-2xl font-semibold mb-4">Detailed Analytics</h3>
            <p className="text-gray-600">
              Track your performance with advanced analytics. Understand your
              audience, and optimize your content strategy to increase engagement.
            </p>
          </motion.div>

          {/* Feature 6: Secure Payments */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gray-100 rounded-lg shadow-md"
          >
            <h3 className="text-2xl font-semibold mb-4">Secure Payments</h3>
            <p className="text-gray-600">
              Earn from your content with our secure and fast payment system.
              Receive payouts directly to your preferred method.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
