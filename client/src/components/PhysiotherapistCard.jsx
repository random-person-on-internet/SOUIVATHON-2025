import React from "react";

const PhysiotherapistCard = ({ fullName, address, contactNumber }) => {
  return (
    <div
      className="w-full max-w-sm bg-gray-900 rounded-lg p-5 shadow-md 
                  hover:shadow-lg hover:shadow-blue-500/70
                  transition duration-300 border border-gray-700"
    >
      {/* Name */}
      <h2 className="text-lg font-semibold text-gray-100 text-center group-hover:text-blue-400 transition-colors duration-300">
        {fullName}
      </h2>

      {/* Address */}
      <p className="text-sm text-gray-400 mt-2 text-center">
        <i className="fas fa-map-marker-alt mr-2"></i> {address}
      </p>

      {/* Contact Number */}
      <p className="text-sm text-gray-400 mt-2 text-center">
        <i className="fas fa-phone mr-2"></i> {contactNumber}
      </p>
    </div>
  );
};

export default PhysiotherapistCard;
