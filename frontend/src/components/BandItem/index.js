
import React from "react";
//import api from "../../services/api";
import "./styles.css";
function BandItem({ band }) {
  
  // async function handleRemove() {
  //   await api.delete(`/bands/${band.github_username}`);
  // }
  return (
    <li className="band-item">
      <header>
        <img src={band.avatar_url} alt={band.name} />
        <div className="band-info">
          <strong>{band.name}</strong>
          <span>{band.techs.join(", ")}</span>
        </div>
      </header>
      <p>{band.bio}</p>
      <a href={`https://github.com/${band.github_username}`}>
        Acessar perfil no GitHub
      </a>
    </li>
  );
}
export default BandItem;
