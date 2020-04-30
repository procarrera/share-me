import React, { useState, useEffect } from "react";

import "./styles.css";
import ImgLoader from "../ImgLoader";
import Trophy from "../../assets/trophy.png";
import AddUser from "../../assets/add-user.png";
import Refresh from "../../assets/refresh.png";
require("dotenv").config();

function DevItem({ dev, devScore }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [show, setShow] = useState("none");
  const [score, setScore] = useState([]);

  const filestackapi = process.env.REACT_APP_FILESTACK_API_KEY;

  const fitImage =
    `https://cdn.filestackcontent.com/${filestackapi}/` +
    `resize=width:54,height:54,fit:clip,align:top` +
    `/output=secure:true/` +
    `${dev.avatar_url}`;

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
          src={fitImage}
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
      <div className="links">
        <a
          id="user-page"
          href={`https://github.com/${dev.github_username}`}
          target="_blank"
        >
          <span>Access GitHub</span>
        </a>
        <button>
          <img
            src={Refresh}
            style={{ height: "16px", width: "16px" }}
            alt="auto-update"
          />
        </button>
      </div>
    </li>
  );
}
export default DevItem;
