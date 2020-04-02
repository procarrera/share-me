import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./global.css";
import "./app.css";
import "./sidebar.css";
import "./main.css";
import logoGithub from "./assets/github.png";
import logo from "./assets/share.svg";

import BandItem from "./components/BandItem/index";
import BandForm from "./components/BandForm/index";

// Component : bloco isolado de html, css e js o qual nao interfere no restante da aplicação
// Propriedade: Informações que um componente pai (PARENT) passa para o componente filho (CHILD)
// Estado: Informações mantidas pelo componente (Lembrar do conceito de imutabilidade)

function App() {
  const [bands, setBands] = useState([]);

  useEffect(() => {
    async function loadBands() {
      const response = await api.get("/bands");
      setBands(response.data);
    }
    loadBands();
  }, []);

  async function handleAddBand(data) {
    const response = await api.post("/bands", data);
    setBands([...bands, response.data]);
  }

  return (
    <div className="container">
      <header id="header">
        <h1>
          <img src={logo} height="55" alt="Github" />
          .me <span style={{ fontWeight: 400, fontSize: 20 }}>
            &nbsp;|
          </span>{" "}
          <div id="count-block">
            <img src={logoGithub} height="20" alt="Github" />
          </div>
        </h1>
        <info>we are all connected, enjoy ; )</info>
      </header>
      <div id="app">
        <aside>
          <strong>cadastre seu perfil</strong>
          <BandForm onSubmit={handleAddBand} />
        </aside>
        <main>
          <ul>
            {bands.map(band => (
              <BandItem key={band._id} band={band} />
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}

export default App;
