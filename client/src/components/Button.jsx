import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-black",
  textColor = "text-gray-200",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg shadow-purple-400 transition-all duration-300 ease-in-out shadow-lg hover:shadow-green-500/50  hover:text-green-400 ${textColor} ${bgColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
