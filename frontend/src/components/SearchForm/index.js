import React, { useState } from "react";

import "./styles.css";
import Search from "../../assets/search.png";
import Clear from "../../assets/clear.png";
import People from "../../assets/audience.png";

export default function SearchForm({ onSubmit, results }) {
  const [techs, setTechs] = useState("");

  async function handleSearch(e) {
    e.preventDefault();
    await onSubmit(techs);
  }

  function keyPress(e) {
    if (e.keyCode == 13) {
      var element = document.querySelector("#devs_list");
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      //console.log("value", e.target.value);
      // put the login here
    } else {
     // console.log(e.keyCode);
    }
  }

  function handleClear() {
    setTechs("");
  }

  return (
    <form onSubmit={handleSearch} autoComplete="off">
      <div className="search-container">
        <input
          placeholder="JavaScript, React Native, ReactJS..."
          name="techs"
          id="techs"
          value={techs}
          onChange={(e) => setTechs(e.target.value)}
          onKeyUp={(e) => keyPress(e)}
        />
        {results !== 0 && (
          <div id="results">
            {results} <img src={People} alt="" />
          </div>
        )}
        <button type="submit" id="search">
          <img src={Search} alt="" />
        </button>
        <button id="clear" onClick={() => handleClear()}>
          <img src={Clear} alt="" />
        </button>
      </div>
    </form>
  );
}
