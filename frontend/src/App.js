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
import SearchForm from "./components/SearchForm/index";
import FlashMessager from "./components/FlashMessager";
import Loader from "./components/Loader";
import GoogleNews from "./components/GoogleNews";

function App() {
  const [allLoaded, setAllLoaded] = useState(false);
  const [fade, setFade] = useState("");
  const [show, setShow] = useState("collapse");
  const [message, setMessage] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(true);
  const [devs, setDevs] = useState([]);
  const [filteredDevs, setFilteredDevs] = useState([]);
  const [isfiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    setDataLoading(true);
    async function loadDevs() {
      const response = await api.get("/devs");
      setDevs(response.data.reverse());
      setDataLoading(false);
    }
    loadDevs();
  }, []);

  document.fonts.onloadingdone = () => {
    setFontsLoaded(false);
  };

  useEffect(() => {
    if (dataLoading !== true && fontsLoaded !== true) {
      setAllLoaded(true);
    }
  }, [dataLoading, fontsLoaded]);

  async function handleAddDev(data) {
    setIsFiltered(false);
    const response = await api.post("/devs", data);
    setMessage(response.data.message);
    if (response.status === 201) {
      if (response.data.dev.name == undefined) {
        return setMessage("Welcome!");
      }
      setDevs([response.data.dev, ...devs]);
      setMessage(response.data.message);
    } else {
      setMessage(response.data.message);
    }
  }

  async function handleSearchDev(techs) {
    const response = await api.get("/search", { params: { techs: techs } });
    if (techs !== "") {
      setIsFiltered(true);
      setFilteredDevs(response.data.devs);
      console.log("setou a busca");
    } else {
      setFilteredDevs([]);
      setIsFiltered(false);
      console.log("CANCELOU");
    }
  }

  useEffect(() => {
    if (message !== "") {
      function flashMassage() {
        setTimeout(function () {
          setShow("visible");
          setFade("fade-in");
        }, 500);
        setTimeout(function () {
          setFade("fade-out");
        }, 4650);
        setTimeout(function () {
          setShow("collapse");
        }, 5400);
      }
      flashMassage();
    }
  }, [message]);

  return (
    <div className="container">
      <GoogleNews />
      <header id="header">
        <h1>
          <img src={logo} height="75" alt="Github" />
          .me <span style={{ fontWeight: 400, fontSize: 28 }}>
            &nbsp;|
          </span>{" "}
          <div id="count-block">
            <img src={logoGithub} height="20" alt="Github" />
          </div>
        </h1>
        <div className="slogan">we are all connected, enjoy ; )</div>
        <SearchForm onSubmit={handleSearchDev} />
      </header>
      <div id="app">
        <aside>
          <strong>cadastre seu perfil</strong>
          <FlashMessager message={message} visibility={show} fade={fade} />
          <DevForm onSubmit={handleAddDev} />
        </aside>
        {!allLoaded && <Loader />}
        {allLoaded && (
          <main>
            <ul>
              {isfiltered
                ? filteredDevs.map((dev) => <DevItem key={dev._id} dev={dev} />)
                : devs.map((dev) => <DevItem key={dev._id} dev={dev} />)}
            </ul>
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
