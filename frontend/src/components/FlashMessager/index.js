import React from "react";
import "./styles.css";

export default function FlashMessager({ message, visibility, fade}) {
  return (
    <div className={`alert ${fade}`} style={{visibility: `${visibility}`, backgroundColor: "#3d3d3d" }}>
      {message}
    </div>
  );
}
