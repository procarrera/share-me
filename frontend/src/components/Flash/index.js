import React from "react";
import "./styles.css";

export default function Flash({ message, visibility, fade }) {
  return (
    <div className={`${fade}`} style={{ visibility: `${visibility}` }}>
      {message}
      <div className="speech-bubble-ds-arrow"></div>
    </div>
  );
}
