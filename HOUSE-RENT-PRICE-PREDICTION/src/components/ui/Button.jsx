import React from 'react';

export default function Button({ children, onClick, className = '' }) {
  return (
    <button
      className={`bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
