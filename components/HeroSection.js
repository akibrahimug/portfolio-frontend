import React from "react";
import Avarta from "./Avarta";
import ProfileDesc from "./ProfileDesc";
const cetified = [
  "Search Engine Optimization",
  "E-Commerce systems experience",
  "Testing and Debugging",
  "Algorithms and Data Structures",
  "Version control systems",
  "Web Accessibility",
  "Front End Libraries",
  "Data Visualization",
  "APIs",
  "Agile Methodologies",
  "Responsive Web Design",
  "Progressive Web Apps",
  "GCP Infrastructure and Services",
];
function HeroSection() {
  return (
    <div className="grid ll:grid-cols-2 relative mb-32">
      <ProfileDesc cetified={cetified} />
      <Avarta />
    </div>
  );
}

export default HeroSection;
