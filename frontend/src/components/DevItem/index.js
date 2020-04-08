import React, { useState } from "react";
//import api from "../../services/api";

import "./styles.css";
import ImgLoader from "../ImgLoader";

function DevItem({ dev }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [show, setShow] = useState("none");

  // async function handleRemove() {
  //   await api.delete(`/bands/${band.github_username}`);
  // }
  function imgIsLoaded() {
    setImgLoaded(true);
    setShow("initial");
  }

  return (
    <li className="band-item">
      <header>
        {!imgLoaded && <ImgLoader/>}
        <img
          id="avatar"
          onLoad={() => {
            imgIsLoaded();
          }}
          src={dev.avatar_url}
          alt={dev.name}
          style={{display:`${show}`}}
        />
        <div className="band-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(", ")}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>
        Acessar perfil no GitHub
      </a>
    </li>
  );
}
export default DevItem;
