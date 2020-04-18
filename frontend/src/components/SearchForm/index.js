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
        />
        {results !== 0 && (
          <div id="results">
            {results} <img src={People} />
          </div>
        )}
        <button type="submit" id="search">
          <img src={Search} />
        </button>
        <button id="clear" onClick={() => handleClear()}>
          <img src={Clear} />
        </button>
      </div>
    </form>
  );
}
