const { Router } = require("express");
const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");
const NewsAPI = require("./controllers/NewsAPI");

const routes = Router();

routes.get("/teste", (req, res) => {
  res.send("testado!");
});

routes.get("/", (req, res) => {
  res.status(301).redirect("https://share-me.now.sh/");
});

routes.get("/news", NewsAPI.index);

routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);
routes.put("/devs/:dev_name", DevController.update);
//routes.delete("/devs/:dev_name", DevController.destroy);

routes.get("/search", SearchController.index);

module.exports = routes;
