import React, { useState, useEffect } from "react";
import "./styles.css";

export default function Flash(props) {
  let [visibility, setVisibility] = useState("false");
  let [message, setMessage] = useState("");
  let [type, setType] = useState("");

  return (
    <div className="alert">
      <h1>{props.message}</h1>
    </div>
  );
}
