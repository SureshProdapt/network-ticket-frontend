import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({ 
  text, 
  onClick, 
  variant = 'primary',
  to = null,
  type = 'button',
  disabled = false,
  className = ''
}) {
  const baseClasses =
    'px-10 py-4 rounded-lg font-semibold transition transform active:scale-95 inline-block text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-gradient-to-r from-cyan-400 to-blue-400 text-gray-900 hover:shadow-lg hover:shadow-cyan-400/50 hover:scale-105',
    outline:
      'border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900',
  };

  const combinedClasses = `${baseClasses} ${variants[variant]} ${className}`;

  // If 'to' prop is provided, render as Link
  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {text}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button 
      onClick={onClick} 
      type={type}
      disabled={disabled}
      className={combinedClasses}
    >
      {text}
    </button>
  );
}