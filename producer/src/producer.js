const amqp = require("amqplib/callback_api");

exports.sendToQueue = (msg, users) => {
  amqp.connect(
    `amqp://${process.env.RMQ_HOST}`,
    function (conError, connection) {
      if (conError) {
        throw conError;
      }
      connection.createChannel(function (createError, channel) {
        if (createError) {
          throw createError;
        }

        let queue = process.env.RMQ_QUEUE;

        channel.assertQueue(queue, {
          durable: true,
        });

        const queueMessage = constructMessage(msg, users);

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(queueMessage)), {
          persistent: true,
        });

        console.log("Sent '%s'", queueMessage);
      });
    }
  );
};

function constructMessage(msg, subscribers) {
  if (msg && subscribers && subscribers.length > 0) {
    // construct rabbitmq message with input message + users info
    return {
      // message object
      ...msg,
      // inactive devices filtered out
      users: subscribers
        .filter((s) => s.isDeviceActive)
        .map((s) => {
          // send user language to handle in consumer
          var obj = {
            language: s.language,
          };
          // if message is type sms, only send phone number
          if (msg.type === "SMS") {
            obj["phoneNumber"] = s.phoneNumber;
          } else {
            // only supports sms and push notifications
            obj["deviceToken"] = s.deviceToken;
            obj["deviceType"] = s.deviceType;
          }
          return obj;
        }),
    };
  }
}
