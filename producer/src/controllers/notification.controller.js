const db = require("../models");
const Notification = db.Notification;
const Subscriber = db.Subscriber;
const Op = db.Sequelize.Op;
const producer = require("../producer.js");

// Create and Save a new Notification
exports.create = (req, res) => {};

// Retrieve all Notifications from the database.
exports.findAll = (req, res) => {
  const { userToken } = req.query;
  const filter = userToken ? {
    attributes: ['id', 'text_en', 'text_ar', 'type'],
    where: {
      "$Subscribers.userToken$": userToken,
    },
    include: [{ model: Subscriber, required: false, attributes:[] }]
  }
    : {};
  Notification.findAll(filter)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving notifications.",
      });
    });
  producer.sendToQueue("test swvl application notification");
};
