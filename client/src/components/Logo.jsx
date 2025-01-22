import React from "react";
import logo from "../assets/Blog-App-Image.webp";

export default function ({ width = "100px" }) {
  return <img src={logo} alt="Blog Logo" width={width} />;
}
