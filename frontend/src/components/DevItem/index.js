
import React from "react";
//import api from "../../services/api";
import "./styles.css";
function DevItem({ dev }) {
  
  // async function handleRemove() {
  //   await api.delete(`/bands/${band.github_username}`);
  // }

  return (
    <li className="band-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
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
