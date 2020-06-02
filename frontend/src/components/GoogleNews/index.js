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
  const [searchTerms, setSearchTerms] = useState("javascript");

  useEffect(() => {
    if (sessionStorage.getItem("keywords") != null) {
      console.log("existe keywords no sessionStorage");
      var encoded = encodeURIComponent(sessionStorage.getItem("keywords"));
      setSearchTerms(encoded);
      console.log("searchTerms: ", searchTerms);
    } else {
      setSearchTerms("javascript");
      console.log("NAO existe keywords no sessionStorage");
      console.log("searchTerms: ", searchTerms);
    }
  }, [update]);

  /* let googleapi = axios.create({
    baseURL:
      `https://newsapi.org/v2/everything?q=` +
      `${keywords[0]}+${keywords[1]}` +
      `&language=${language}` +
      `&sortBy=relevancy` +
      `&pageSize=100` +
      `&apiKey=5e1805fb09874fa09e9839c546659305`,
  }); */

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

  useEffect(() => {
    if (closed === false) {
      async function googleApi() {
        const response = await axios.get("http://localhost:3333/news", {
          params: { keywords: searchTerms },
        });
        //console.log(response.data.totalResults);
        if (response.data.totalResults === 0) {
          console.log("Total results === 0");
          console.log(`total results: ${response.data.totalResults}`);
          setSearchTerms("javascript");
          setNews({
            title: "humn, there is no relevant news at the moment :(",
            url: "",
          });
          //console.log(news);
        } else if (response.data.totalResults <= 100) {
          console.log("totalResults <= 100");
          console.log(`total results: ${response.data.totalResults}`);
          setNews(
            response.data.articles[
              Math.floor(Math.random() * (+response.data.totalResults - +0)) +
                +0
            ]
          );
        } else {
          console.log("totalResults > 100");
          console.log(`total results: ${response.data.totalResults}`);
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
        <button href="#" id="news-img" onClick={() => handleClose()}>
          <img src={NewsIcon} alt="news sync" />
        </button>
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
    </div>
  );
}
