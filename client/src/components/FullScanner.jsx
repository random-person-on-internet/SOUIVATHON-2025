import React from "react";

// components
import { Button } from "./";

const FullScanner = () => {
  const handleRunScript = async () => {
    try {
      const response = await fetch("http://localhost:5000/run-python");
      const message = await response.text();
      alert(message);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to run the script.");
    }
  };

  return (
    <div>
      <Button onClick={handleRunScript}>Movement Tracker</Button>
    </div>
  );
};

export default FullScanner;
