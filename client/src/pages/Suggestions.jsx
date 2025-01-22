import React, { useState, useEffect } from "react";
import { Container, SuggestionCard } from "../components";

const SuggestionData = [
  {
    title: "Maintain Neutral Spine Alignment",
    definition:
      "Ensure your chair supports the natural curve of your spine. Adjust the backrest so that it fits snugly against your lower back and promotes a neutral spine posture.",
  },
  {
    title: "Monitor Placement",
    definition:
      "Position your computer monitor at eye level, about 20-28 inches from your face. The top of the screen should be at or slightly below eye level to prevent neck strain.",
  },
  {
    title: "Adjust Seat Height",
    definition:
      "Set your chair height so that your feet rest flat on the floor and your knees are at a 90-degree angle. This minimizes pressure on your thighs and lower back.",
  },
  {
    title: "Keyboard and Mouse Placement",
    definition:
      "Keep your keyboard and mouse at elbow height, with your forearms parallel to the ground. This reduces strain on your wrists and shoulders.",
  },
  {
    title: "Take Regular Breaks",
    definition:
      "Every 30-60 minutes, stand up, stretch, or walk around to reduce the risk of stiffness and improve circulation.",
  },
  {
    title: "Use a Footrest if Needed",
    definition:
      "If your feet don't reach the ground comfortably, use a footrest to provide proper support and maintain a balanced posture.",
  },
  {
    title: "Check Armrest Height",
    definition:
      "Adjust armrests so that your shoulders are relaxed, and your elbows are at a 90-degree angle. This prevents tension in the neck and shoulders.",
  },
  {
    title: "Avoid Forward Head Posture",
    definition:
      "Keep your ears aligned with your shoulders and avoid leaning your head forward while working. Consider using a headset for phone calls.",
  },
  {
    title: "Ergonomic Desk Setup",
    definition:
      "Ensure your desk is at a height where your forearms are parallel to the ground when typing, and there's sufficient space for your legs underneath.",
  },
  {
    title: "Lumbar Support",
    definition:
      "Use a chair with built-in lumbar support or add a cushion to maintain the natural curve of your lower back.",
  },
];

const Suggestions = () => {
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"> */}
          {SuggestionData.map((e) => (
            <div key={e.title} className="p-2 w-1/4">
              <SuggestionCard {...e} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Suggestions;
