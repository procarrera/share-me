require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./src/routes");

const port = "3333";

const app = express();

mongoose.connect(process.env.MONGO_SHARE_ME, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//MÉTODOS HTTP GET, POST, PUT, DELETE

//Tipos de parametros:
//Querry Params: req.query (Filtros, ordenação, paginação, ...)
//Route Params: req.params (Identificar um recurso na alteração, ou remoção de dado)
//Body: req.body (Dados para criação ou alteração de um registro)

app.listen(port, () => {
  console.log(`Server running locally on port: ${port}`);
});
