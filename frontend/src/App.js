import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./global.css";
import "./app.css";
import "./sidebar.css";
import "./main.css";
import logoGithub from "./assets/github.png";
import logo from "./assets/share.svg";

import DevItem from "./components/DevItem/index";
import DevForm from "./components/DevForm/index";
import Flash from "./components/Flash";

// Component : bloco isolado de html, css e js o qual nao interfere no restante da aplicação
// Propriedade: Informações que um componente pai (PARENT) passa para o componente filho (CHILD)
// Estado: Informações mantidas pelo componente (Lembrar do conceito de imutabilidade)

function App() {
  const [fade, setFade] = useState("");
  const [show, setShow] = useState("collapse");
  const [message, setMessage] = useState("Hi there !");
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");
      setDevs(response.data.reverse());
    }
    loadDevs();
  }, []);

  useEffect(() => {
    function flashMassage() {
      setTimeout(function () {
        setShow("visible");
        setFade("alert fade-in");
      }, 1850);
      setTimeout(function () {
        setFade("alert fade-out");
      }, 7500);
      setTimeout(function () {
        setShow("collapse");
      }, 8250);
    }
    flashMassage();
  }, [devs, message]);

  async function handleAddDev(data) {
    const response = await api.post("/devs", data);
    setMessage(response.data.message);
    if (response.status === 201) {
      setDevs([response.data.dev, ...devs]);
      setMessage(response.data.message);
      if (response.data.dev.name == undefined) {
        console.log("IF DO NULL: " + response.data.dev.name);
        return setMessage("Welcome, don't you have a name?");
      }
    }
    console.log("passou aqui");
    setMessage(response.data.message);
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
        <slogan>we are all connected, enjoy ; )</slogan>
        <Flash message={message} visibility={show} fade={fade} />
      </header>
      <div id="app">
        <aside>
          <strong>cadastre seu perfil</strong>
          <DevForm onSubmit={handleAddDev} />
        </aside>
        <main>
          <ul>
            {devs.map((dev) => (
              <DevItem key={dev._id} dev={dev} />
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}

export default App;
