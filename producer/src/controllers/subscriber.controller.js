const db = require("../models");
const Subscriber = db.Subscriber;
const Op = db.Sequelize.Op;

// Create and Save a new subscriber
exports.create = async (req, res) => {
    try {
        const subscriber = await Subscriber.create(req.body);
        return res.status(201).json({
            subscriber
        });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Deactivates a subscriber's device
exports.deactivate = async (req, res) => {
  try {
    const { userToken, deviceToken } = req.body;
    const subscriber = await Subscriber.findOne({
      where: {
        userToken: userToken,
        deviceToken: deviceToken,
      },
    });
    if (subscriber) {
      const [updated] = await Subscriber.update({
        isDeviceActive: false
      }, { where: { id: subscriber.id } });
      if (updated) {
        const updatedSubscriber = await Subscriber.findOne({
          where: { id: subscriber.id }
        });
        return res.status(200).json({ updatedSubscriber });
      }
    }
    else {
      return res.status(404).send('user not found');
    }
  }
  catch (err) {
    return res.status(500).send(err.message);
  }
 };

// Retrieves all subscribers from the database.
exports.findAll = (req, res) => {
  Subscriber.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving subscribers.",
      });
    });
};