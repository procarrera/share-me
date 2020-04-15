import React, { useState } from "react";
//import api from "../../services/api";

import "./styles.css";
import ImgLoader from "../ImgLoader";

function DevItem({ dev }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [show, setShow] = useState("none");

  function imgIsLoaded() {
    setImgLoaded(true);
    setShow("initial");
  }

  return (
    <li className="band-item">
      <header>
        {!imgLoaded && <ImgLoader />}
        <img
          id="avatar"
          onLoad={() => {
            imgIsLoaded();
          }}
          src={dev.avatar_url}
          alt={dev.name}
          style={{ display: `${show}` }}
        />
        <div className="band-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(", ")}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <div></div>
      <a href={`https://github.com/${dev.github_username}`} target="_blank">
        acessar perfil no GitHub
      </a>
    </li>
  );
}
export default DevItem;
