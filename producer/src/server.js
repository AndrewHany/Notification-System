const app = require("./app");
// set port, listen for requests

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}.`);
  });
}
