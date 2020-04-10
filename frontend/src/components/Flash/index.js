import React from "react";
import "./styles.css";

export default function Flash({ message, visibility, fade }) {
  return (
    /*<div className={`${fade}`} style={{ visibility: `${visibility}` }}>
      {message}
      <div className="speech-bubble-ds-arrow"></div>
    </div>*/
    <div className="flash-container" style={{ visibility: `${visibility}` }}>
      <div className={`${fade}`}>
        {message}
      </div>
    </div>
  );
}
