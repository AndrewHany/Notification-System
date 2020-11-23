const { sequelize } = require("../models");
const db = require("../models");
const Notification = db.Notification;
const Subscriber = db.Subscriber;
const Op = db.Sequelize.Op;
const producer = require("../producer.js");

// Create and Save a new Notification
exports.create = async (req, res) => {
  try {
    //handling rollbacks with a transaction
    const result = await sequelize.transaction(async (t) => {
      const { usersTokens, ...notification } = req.body;

      if (!usersTokens || !notification || usersTokens.length == 0) {
        res.send(500).send("invalid input format or empty usersTokens array");
      }

      // get subscribers object by usersTokens
      const subscribers = await Subscriber.findAll({
        where: {
          userToken: usersTokens,
        },
      });

      if (subscribers) {
        // create notification item
        const savedNotification = await Notification.create(notification);
        // add subscribers to many to many relationship
        await savedNotification.setSubscribers(subscribers);
        if (savedNotification) {
          // send message to rabbitmq
          producer.sendToQueue(notification, subscribers);
          res.status(201).send(savedNotification);
        }
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Retrieve all Notifications from the database.
exports.findAll = (req, res) => {
  const { userToken } = req.query;
  // if api recieves a usertoken to filter on
  const filter = userToken
    ? {
        // needs to select only main table columns to view
        attributes: ["id", "text_en", "text_ar", "type"],
        // nested association querying
        where: {
          "$Subscribers.userToken$": userToken,
        },
        // include relational table but don't select columns from it
        include: [{ model: Subscriber, required: false, attributes: [] }],
      }
    : {};
  Notification.findAll(filter)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        error:
          err.message || "Some error occurred while retrieving notifications.",
      });
    });
};
