import React from 'react';
import { Wifi } from 'lucide-react';

export default function Navigation({ currentPage, setCurrentPage }) {
  return (
    <nav className="fixed top-0 w-full bg-gray-900 bg-opacity-95 backdrop-blur z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
            <Wifi className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold">NetworkSupport</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setCurrentPage('login')}
            className="px-6 py-2 text-gray-300 hover:text-white transition"
          >
            Login
          </button>
          <button
            onClick={() => setCurrentPage('signup')}
            className="px-6 py-2 bg-cyan-400 text-gray-900 rounded-lg font-semibold hover:bg-cyan-300 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}