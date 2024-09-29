// src/components/Header.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import LoginBtn from './auth/LoginButton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      {/* Logo and Name */}
      <div className="flex items-center space-x-2">
        <img src="/path/to/your/logo.png" alt="Logo" className="h-8 w-8" />
        <span className="text-xl font-bold">Talkies</span>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <Link href="/explore" className="hover:text-gray-300">Explore</Link>
        <Link href="/services" className="hover:text-gray-300">Services</Link>
        <Link href="/contact" className="hover:text-gray-300">Contact</Link>
      </nav>

      {/* Login Button */}
      <div className="flex space-x-4">
        <LoginBtn />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button className="focus:outline-none" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 text-white md:hidden">
          <nav className="flex flex-col space-y-2 p-4">
            <Link href="/" className="hover:text-gray-300" onClick={toggleMenu}>Home</Link>
            <Link href="/explore" className="hover:text-gray-300" onClick={toggleMenu}>Explore</Link>
            <Link href="/services" className="hover:text-gray-300" onClick={toggleMenu}>Services</Link>
            <Link href="/contact" className="hover:text-gray-300" onClick={toggleMenu}>Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
