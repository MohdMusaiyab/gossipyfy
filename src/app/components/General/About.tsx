"use client";

import { motion } from "framer-motion";
import React from "react";

const About = () => {
  return (
    <section className="relative flex flex-col items-center justify-center py-16 bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-4xl mx-auto px-4"
      >
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold text-gray-800 mb-6"
        >
          About <span className="text-blue-500">Talkies</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-lg md:text-xl text-gray-600 mb-8"
        >
          Welcome to **Talkies**, a platform where creativity thrives. Share your
          conversations, express your ideas, and connect with like-minded
          individuals. Whether it's a friendly chat, a podcast, or a powerful
          debate, your voice deserves to be heard. And guess what? The more
          people listen, the more you can **monetize** your content!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-xl font-semibold mb-4"
            >
              Share Your Talks
            </motion.h3>
            <p className="text-gray-600">
              Upload your conversations, thoughts, and talks with friends.
              Let the world hear what you have to say.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-xl font-semibold mb-4"
            >
              Build a Community
            </motion.h3>
            <p className="text-gray-600">
              Engage with your audience and grow your following by sharing unique
              and relatable content.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="text-xl font-semibold mb-4"
            >
              Monetize Your Ideas
            </motion.h3>
            <p className="text-gray-600">
              As your talks get more attention, start earning from your content
              through views, ads, and sponsorships.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
