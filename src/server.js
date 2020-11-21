const app = require("./app");
// set port, listen for requests
const PORT = 8081;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}
