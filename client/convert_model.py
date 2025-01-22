import tensorflowjs as tfjs
from tensorflow.keras.models import load_model
import os

# Paths
input_model_path = "./model/image_classifier.h5"  # Path to the .h5 model
output_dir = "./public/model/tfjs_model"  # Output directory for the converted model

# Ensure output directory exists
os.makedirs(output_dir, exist_ok=True)

# Load the Keras model
model = load_model(input_model_path)

# Convert to TensorFlow.js format
tfjs.converters.save_keras_model(model, output_dir)

print(f"Model successfully converted and saved to {output_dir}")
