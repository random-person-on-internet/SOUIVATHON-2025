import React from "react";

const SuggestionCard = ({ title, definition }) => {
  return (
    <div
      className="w-full max-w-sm bg-gray-900 rounded-lg p-5 shadow-md 
                  hover:shadow-lg hover:shadow-blue-500/70
                  transition duration-300 border border-gray-700"
    >
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-100 text-center group-hover:text-blue-400 transition-colors duration-300">
        {title}
      </h2>

      {/* Definition */}
      <p className="text-sm text-gray-400 mt-2 text-center">
        <i className="fas fa-map-marker-alt mr-2"></i> {definition}
      </p>
    </div>
  );
};

export default SuggestionCard;
