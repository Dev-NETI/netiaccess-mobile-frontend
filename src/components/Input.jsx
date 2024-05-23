import React from "react";

function Input({ holder, ...props }) {
  return (
    <input 
    className="block w-full rounded-md border-0 px-3.5 py-4 text-gray-900 shadow-sm ring-1 ring-inset 
    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    placeholder={holder} 
    {...props} />
  );
}

export default Input;
