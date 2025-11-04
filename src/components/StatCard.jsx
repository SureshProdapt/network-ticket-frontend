import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'cyan' }) {
  const colorClasses = {
    cyan: 'bg-cyan-500/20 text-cyan-400',
    green: 'bg-green-500/20 text-green-400',
    red: 'bg-red-500/20 text-red-400',
    purple: 'bg-purple-500/20 text-purple-400',
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-cyan-400/50 transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-4xl font-bold mt-2">{value}</p>
        </div>
        {Icon && (
          <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
            <Icon className="w-7 h-7" />
          </div>
        )}
      </div>
    </div>
  );
}