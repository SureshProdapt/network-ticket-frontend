import React from 'react';

export default function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/30 transition transform hover:translate-y-[-4px] group cursor-pointer relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition duration-500" />
      <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-cyan-400/50 group-hover:shadow-xl group-hover:shadow-cyan-400/70 transition">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition">{title}</h3>
      <p className="text-gray-400 group-hover:text-gray-300 transition">{desc}</p>
    </div>
  );
}
