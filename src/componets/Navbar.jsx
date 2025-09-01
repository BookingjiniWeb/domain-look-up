"use client";
import { useState } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import { HomeIcon, BarChart2, User } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl font-bold text-gray-900">
            <a href="https://bookingjini.com">
              <img src="https://bookingjini.com/wp-content/uploads/2024/06/download-1.png" alt="Image" style={{ width: "150px" }} />
            </a>
          </div>
          <div className="text-xl font-bold text-gray-900">
            <h1 className="text-xl font-extrabold  text-indigo-600 text-center">🔍 Domain & SSL Lookup </h1>
          </div>

          {/* Right Side Button */}
          <div className="hidden md:block">
            <a
              href="/dashboard"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white bg-black hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <HomeIcon className="w-5 h-5 text-white drop-shadow-sm" />
              <span className="font-semibold tracking-wide">View Dashboard</span>
            </a>
          </div>


          <div className="hidden md:block">
            <a
              href="/login"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <ShieldCheck className="w-5 h-5 text-white drop-shadow-sm" />
              <span className="font-semibold tracking-wide">Use as Admin</span>
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
          <a href="/login" className="block px-4 py-2 bg-blue-600 text-white text-center rounded-lg mx-4 mt-2">
            View My Site
          </a>
        </div>
      )}
    </nav>
  );
}
