"use client";

import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center mb-6 md:mb-0">
          <img src="/path/to/logo.png" alt="Talkies Logo" className="h-12 w-12 mr-2" />
          <span className="text-2xl font-bold">Talkies</span>
        </div>

        {/* Vertical Navigation Links */}
        <div className="flex flex-col mb-6 md:mb-0">
          <a href="/" className="mb-2 hover:text-white transition duration-200">Home</a>
          <a href="/about" className="mb-2 hover:text-white transition duration-200">About</a>
          <a href="/services" className="mb-2 hover:text-white transition duration-200">Services</a>
          <a href="/contact" className="hover:text-white transition duration-200">Contact</a>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white transition duration-200">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-white transition duration-200">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-white transition duration-200">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-white transition duration-200">
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Talkies. All rights reserved.
        </p>
        <p className="text-sm">
          Contact us: <a href="mailto:support@talkies.com" className="hover:text-white">support@talkies.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
