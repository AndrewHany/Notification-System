module.exports = (app) => {
  const notifications = require("../controllers/notification.controller.js");

  var router = require("express").Router();

  // Create a new Notification
  router.post("/", notifications.create);

  // Retrieve all Notifications
  router.get("/", notifications.findAll);

  // Retrieve a single Notification with id
  router.get("/:id", notifications.findOne);

  // Update a Notification with id
  router.put("/:id", notifications.update);

  // Delete a Notification with id
  router.delete("/:id", notifications.delete);

  // Delete all Notifications
  router.delete("/", notifications.deleteAll);

  app.use("/api/notifications", router);
};
