const db = require("../models");
const Notification = db.Notification;
const Op = db.Sequelize.Op;

// Create and Save a new Notification
exports.create = (req, res) => {};

// Retrieve all Notifications from the database.
exports.findAll = (req, res) => {

  Notification.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving notifications.",
      });
    });
};

// Find a single Notification with an id
exports.findOne = (req, res) => {};

// Update a Notification by the id in the request
exports.update = (req, res) => {};

// Delete a Notification with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Notifications from the database.
exports.deleteAll = (req, res) => {};

