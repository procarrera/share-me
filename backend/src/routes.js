const { Router } = require("express");
const BandController = require("./controllers/BandController");
const SearchController = require("./controllers/SearchController");

const routes = Router();

routes.get("/teste", (req, res) => {
  res.send("testado!");
});
routes.get("/", (req, res) => {
  res.status(301).redirect("https://share-me.now.sh/");
});

routes.get("/bands", BandController.index);
routes.post("/bands", BandController.store);
routes.delete("/bands/:band_name", BandController.destroy);

routes.get("/search", SearchController.index);

module.exports = routes;
