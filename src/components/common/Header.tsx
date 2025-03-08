'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from './Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/courses" className="text-gray-600 hover:text-gray-900">
              Courses
            </Link>
            <Link href="/support" className="text-gray-600 hover:text-gray-900">
              Support
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-gray-900">
              Cart
            </Link>
            <Link 
              href="/login"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Login
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/courses" 
                className="text-gray-600 hover:text-gray-900 px-2 py-1"
              >
                Courses
              </Link>
              <Link 
                href="/support" 
                className="text-gray-600 hover:text-gray-900 px-2 py-1"
              >
                Support
              </Link>
              <Link 
                href="/cart" 
                className="text-gray-600 hover:text-gray-900 px-2 py-1"
              >
                Cart
              </Link>
              <Link 
                href="/login"
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 inline-block"
              >
                Login
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
} 