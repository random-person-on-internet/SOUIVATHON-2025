import React, { useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";

// components
import { FullScanner, Button } from "../components";

const Scan = () => {
  const [position, setPosition] = useState(null); // To store the evaluation result
  const [imagePreview, setImagePreview] = useState(null); // To display the image
  const [loading, setLoading] = useState(false); // To show a loading state
  const fileInputRef = useRef(null);

  // Load the model
  const loadModel = async () => {
    try {
      const model = await tf.loadLayersModel("/model/image_classifier.h5");
      return model;
    } catch (error) {
      console.error("Error loading the model:", error);
      return null;
    }
  };

  // Handle image upload and preview
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Display the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Process and predict
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!fileInputRef.current?.files[0]) {
      alert("Please upload an image!");
      return;
    }

    setLoading(true);

    const model = await loadModel();
    if (!model) {
      setLoading(false);
      alert("Failed to load the model.");
      return;
    }

    // Load the image file
    const img = new Image();
    img.src = imagePreview;
    img.onload = async () => {
      // Preprocess the image
      const tensor = tf.browser
        .fromPixels(img)
        .resizeNearestNeighbor([150, 150]) // Resize to match model input
        .toFloat()
        .div(tf.scalar(255.0)) // Normalize
        .expandDims(); // Add batch dimension

      // Predict the posture
      const prediction = model.predict(tensor);
      const isGoodPosture = (await prediction.data())[0] > 0.5;

      setPosition(isGoodPosture ? "true" : "false"); // Update the position state
      setLoading(false);
    };
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          style={{ marginBottom: "20px" }}
        />
        <br />
        <Button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </Button>
      </form>
      {imagePreview && (
        <div style={{ marginBottom: "20px" }}>
          <img src={imagePreview} alt="Preview" width={150} />
        </div>
      )}
      {position && (
        <div style={{ marginBottom: "20px" }}>
          <p>
            Posture is: <strong>{position === "true" ? "Good" : "Bad"}</strong>
          </p>
        </div>
      )}
      <div style={{ marginTop: "40px" }}>
        <FullScanner />
        <p style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
          Click to see full body scan
        </p>
      </div>
    </div>
  );
};

export default Scan;
