const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');
const cors = require("cors");
const db = require("./models");

const app = express();
require("./routes/notification.routes")(app);

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.redirect('/api-docs')
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


module.exports = app;
