import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wifi } from 'lucide-react';

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full bg-gray-900 bg-opacity-95 backdrop-blur z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-400/50">
            <Wifi className="w-6 h-6" />
          </div>
          <span className="text-xl text-white font-bold">NetworkSupport</span>
        </Link>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-2 text-gray-300 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 bg-cyan-400 text-gray-900 rounded-lg font-semibold hover:bg-cyan-300 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}