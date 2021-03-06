const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.js");
const cors = require("cors");
const db = require("./models");

const app = express();
const fs = require("fs");

fs.readdir("./routes", (err, files) => {
  files.forEach((file) => {
    require("./routes/" + file)(app);
  });
});

var corsOptions = {
  origin: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
