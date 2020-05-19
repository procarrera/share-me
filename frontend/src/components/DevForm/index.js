import React, { useState, useEffect } from "react";

export default function DevForm({ onSubmit }) {
  const [github_username, setGithub_username] = useState("");
  const [techs, setTechs] = useState("");
  const [latitude, setLatitude] = useState("0");
  const [longitude, setLongitude] = useState("0");

  function lowerCase(text) {
    setGithub_username(text.toLowerCase());
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log("err");
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    lowerCase(github_username);
    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude,
    });
    sessionStorage.setItem("keywords", techs);
    setGithub_username("");
    setTechs("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">usuário do github:</label>
        <input
          name="github_username"
          id="github_username"
          placeholder=""
          required
          value={github_username}
          onKeyUp={(e) => lowerCase(e.target.value)}
          onChange={(e) => setGithub_username(e.target.value)}
        />
      </div>
      <div className="input-block">
        <label htmlFor="techs">suas habilidades:</label>
        <textarea
          placeholder="ex: JavaScript, HTML, CSS, UX"
          name="techs"
          id="techs"
          required
          value={techs}
          onChange={(e) => setTechs(e.target.value)}
        />
      </div>
      <div className="input-group">
        <div className="input-block">
          <input
            hidden={true}
            type="number"
            name="latitude"
            id="latitude"
            required
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </div>
        <div className="input-block">
          <input
            hidden={true}
            type="number"
            name="longitude"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>
      </div>
      <button type="submit">salvar</button>
    </form>
  );
}
