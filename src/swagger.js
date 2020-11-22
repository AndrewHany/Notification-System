const swaggerJsdoc = require('swagger-jsdoc');
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
        url: "http://localhost:8081/api/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
