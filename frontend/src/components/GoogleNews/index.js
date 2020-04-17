import React, { useEffect, useState } from "react";
import axios from "axios";

import "./styles.css";
import NewsIcon from "../../assets/news-api.png";
import UsFlag from "../../assets/us.png";
import BrFlag from "../../assets/brazil.png";

export default function GoogleNews() {
  const [update, setUpdate] = useState(false);
  const [news, setNews] = useState({ title: "", url: "" });
  const [visible, setVisible] = useState(true);
  const [closed, setClosed] = useState(false);
  const [keywords, setKeywords] = useState(["javascript", ""]);
  const [language, setLanguage] = useState("pt");

  useEffect(() => {
    if (localStorage.getItem("keywords") != null) {
      console.log("existe keywords no localstorage");
      var uncoded = localStorage
        .getItem("keywords")
        .split(",", 2)
        .map((key) => key.trim());
      var encoded = uncoded.map((key) => encodeURIComponent(key));
      if (!encoded[1]) {
        setKeywords([encoded[0], ""]);
        //console.log(keywords[1]);
      } else {
        setKeywords(encoded);
      }
    } else {
      console.log("NAO existe keywords no localstorage");
      setKeywords(["javascript", "node"]);
    }
  }, [update]);

  let googleapi = axios.create({
    baseURL:
      `https://newsapi.org/v2/everything?q=` +
      `${keywords[0]}+${keywords[1]}` +
      `&language=${language}` +
      `&sortBy=relevancy` +
      `&pageSize=100` +
      `&apiKey=5e1805fb09874fa09e9839c546659305`,
  });

  setTimeout(function () {
    if (!closed) {
      setUpdate(!update);
      //console.log("update");
    }
  }, 8000);

  function handleClose() {
    setClosed(!closed);
    setVisible(!visible);
  }

  function handleLanguage(lang) {
    setLanguage(lang);
  }

  useEffect(() => {
    if (closed === false) {
      async function googleApi() {
        const response = await googleapi.get();
        if (response.data.totalResults == 0) {
          console.log(response.data.totalResults);
          setKeywords(["javascript", "node"]);
          setNews({
            title: "humn, there is no relevant news at the moment :(",
            url: "",
          });
          console.log(news);
        } else if (response.data.totalResults <= 100) {
          setNews(
            response.data.articles[
              Math.floor(Math.random() * (+response.data.totalResults - +0)) +
                +0
            ]
          );
        } else {
          setNews(
            response.data.articles[Math.floor(Math.random() * (+100 - +0)) + +0]
          );
        }
      }
      googleApi();
    }
  }, [update]);

  return (
    <div className="news-container">
      <div className="news-row">
        <a href="#" id="news-img" onClick={() => handleClose()}>
          <img src={NewsIcon} alt="news sync" />
        </a>
        {visible && !closed && (
          <a id="news-text" href={news.url} target="_blank">
            <div
              className={`google-news scale-up-hor-right`}
              style={{ visibility: `${visible}` }}
            >
              <p style={{ maxLines: 2 }}>{news.title}</p>
              <p>
                <strong>read more...</strong>
              </p>
            </div>
          </a>
        )}
      </div>
      <div className="language">
        <img src={BrFlag} onClick={() => handleLanguage("pt")} />
        <img src={UsFlag} onClick={() => handleLanguage("en")} />
      </div>
    </div>
  );
}

/*
  return (
    <div className="news-container">
      <div className="news-row">
        <a href="#" id="news-img" onClick={() => handleClose()}>
          <img src={NewsIcon} alt="news sync" />
        </a>
        {visible && !closed && (
          <a id="news-text" href={news.url}>
            <div
              className={`google-news scale-up-hor-right`}
              style={{ visibility: `${visible}` }}
            >
              <p style={{ maxLines: 2 }}>{news.title}</p>
              <p>
                <strong>read more...</strong>
              </p>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}*/
