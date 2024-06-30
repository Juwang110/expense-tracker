import React from "react";
import userIcon from "../assets/userIcon.png";

export default function About() {
  return (
    <img
      src={userIcon}
      alt="Description of image"
      className="w-64 h-auto rounded-lg py-10"
    />
  );
}
