import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white shadow-md rounded-xl p-5 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
