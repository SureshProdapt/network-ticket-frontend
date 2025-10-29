import React from 'react';

export default function ContactCard({ icon, label, value }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/30 transition group cursor-pointer relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition duration-500" />
      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-400/50 group-hover:shadow-xl group-hover:shadow-cyan-400/70 transition">
        {icon}
      </div>
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      <p className="font-semibold text-lg group-hover:text-cyan-400 transition">{value}</p>
    </div>
  );
}