import React, { useState, useEffect } from "react";
//import api from "../../services/api";

import "./styles.css";
import ImgLoader from "../ImgLoader";
import Trophy from "../../assets/trophy.png";

function DevItem({ dev, devScore }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [show, setShow] = useState("none");
  const [score, setScore] = useState([]);

  useEffect(() => {
    let a = dev.score;
    var newArray = [];
    for (var i = 0; i <= a; i++) {
      newArray = newArray.concat(a / a + i);
    }
    setScore(newArray);
  }, [devScore]);

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
          {dev.score && (
            <div id="score">
              {score.map((score) => (
                <img key={score.toString()} src={Trophy} alt="" />
              ))}
            </div>
          )}
          <span>{dev.techs.join(", ")}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`} target="_blank">
        acessar perfil no GitHub
      </a>
    </li>
  );
}
export default DevItem;
