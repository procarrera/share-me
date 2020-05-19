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
import Terms from "./components/Terms";

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
  const [results, setResults] = useState(0);
  const [showTerms, setShowTerms] = useState(false);

  function handleShowTerms() {
    setShowTerms(!showTerms);
  }

  async function loadDevs() {
    const response = await api.get("/devs");
    setDevs(response.data.reverse());
    setDataLoading(false);
  }

  useEffect(() => {
    setDataLoading(true);
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
      if (response.data.dev.name === null) {
        return setMessage("Welcome!");
      }
      setDevs([response.data.dev, ...devs]);
      setMessage(response.data.message);
    } else {
      setMessage(response.data.message);
    }
  }

  async function handleUpdate(dev) {
    setIsFiltered(false);
    const response = await api.put(`/devs/${dev}`);
    setMessage(response.data.message);
    if (response.status === 201) {
      loadDevs();
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
      setResults(response.data.devs.length);
      //console.log("setou a busca");
    } else {
      setResults(0);
      setFilteredDevs([]);
      setIsFiltered(false);
      //console.log("CANCELOU");
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
      <Terms showTerms={showTerms} />
      <GoogleNews />
      <header id="header">
        <h1>
          <img src={logo} height="55" alt="Github"/>
            .me
          <div id="count-block">
            <img src={logoGithub} height="16" alt="Github" />
          </div>
        </h1>
        <div className="slogan">we are all connected</div>
        <SearchForm onSubmit={handleSearchDev} results={results} />
      </header>
      <div id="app">
        <aside>
          <strong>cadastre seu perfil</strong>
          <FlashMessager message={message} visibility={show} fade={fade} />
          <DevForm onSubmit={handleAddDev} />
          <a
            onClick={handleShowTerms}
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "#303030",
              opacity: 0.6,
            }}
          >
            Ao cadastrar concordo com os todos os termos
          </a>
        </aside>
        {!allLoaded && <Loader />}
        {allLoaded && (
          <main>
            <ul id="devs_list">
              {isfiltered
                ? filteredDevs.map((dev) => (
                    <DevItem
                      key={dev._id}
                      dev={dev}
                      devScore={dev.score}
                      update={handleUpdate}
                    />
                  ))
                : devs.map((dev) => (
                    <DevItem key={dev._id} dev={dev} update={handleUpdate} />
                  ))}
            </ul>
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
