"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl font-bold text-gray-900">
            <a href="bookingjini.com">
              <img src="https://bookingjini.com/wp-content/uploads/2024/06/download-1.png" alt="Image" style={{ width: "150px" }} />
            </a>
          </div>

          {/* Desktop Menu */}
          {/* <div className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-500">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-500">About</a>
            <a href="#" className="text-gray-700 hover:text-blue-500">Services</a>
            <a href="#" className="text-gray-700 hover:text-blue-500">Contact</a>
          </div> */}

          {/* Right Side Button */}
          <div className="hidden md:block">
            <a href="https://bookingjini.com" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              View My Site
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <a href="#" className="block px-4 py-2 text-gray-700">Home</a>
          <a href="#" className="block px-4 py-2 text-gray-700">About</a>
          <a href="#" className="block px-4 py-2 text-gray-700">Services</a>
          <a href="#" className="block px-4 py-2 text-gray-700">Contact</a>
          <a href="https://bookingjini.com" className="block px-4 py-2 bg-blue-600 text-white text-center rounded-lg mx-4 mt-2">
            View My Site
          </a>
        </div>
      )}
    </nav>
  );
}
