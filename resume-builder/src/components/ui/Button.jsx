import React from "react";

const Button = ({ children, onClick, className = "" }) => {
  return (
    <button
      className={`px-4 py-2 bg-blue-500 text-white rounded cursor-pointer transition duration-200 hover:bg-blue-600 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
