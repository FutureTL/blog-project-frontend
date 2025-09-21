import React from "react";

const Button = ({
  type = "button",
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg border-2 border-pink-400 
                  bg-white text-pink-400 font-medium transition-colors duration-200 
                  hover:bg-pink-400 hover:text-white 
                  focus:outline-none focus:ring-2 focus:ring-pink-300
                  cursor-pointer
                  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
