import React, { useEffect, useState } from "react";
import axios from "axios";

import "./styles.css";
import NewsIcon from "../../assets/news-api.png";

export default function GoogleNews() {
  const [update, setUpdate] = useState(false);
  const [news, setNews] = useState({ title: "" });
  const [visible, setVisible] = useState(true);
  const [closed, setClosed] = useState(false);
  const [keywords, setKeywords] = useState(["javascript", "node"]);

  useEffect(() => {
    if (localStorage.length != 0) {
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
      setKeywords(["javascript", "node"]);
    }
  }, [update]);

  let googleapi = axios.create({
    baseURL:
      `https://newsapi.org/v2/everything?q=` +
      `${keywords[0]}+${keywords[1]}` +
      `&language=en` +
      `&sortBy=relevancy` +
      `&pageSize=100` +
      `&apiKey=5e1805fb09874fa09e9839c546659305`,
  });

  setTimeout(function () {
    if (!closed) {
      setUpdate(!update);
      //console.log("update");
    }
  }, 18000);

  function handleClose() {
    setClosed(!closed);
    setVisible(!visible);
  }

  useEffect(() => {
    if (closed === false) {
      async function googleApi() {
        const response = await googleapi.get();
        //console.log("numero de resultados: " + response.data.totalResults);
        if (response.data.totalResults <= 100) {
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