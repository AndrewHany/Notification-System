const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config({ path: `./config/.${process.env.NODE_ENV}.env` });

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notification System API with Swagger",
      version: "0.1.0",
      description:
        "This is notification system made with Express and documented with swagger",
    },
    servers: [
      {
        url: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/api`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
