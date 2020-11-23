const amqp = require("amqplib/callback_api");
const messageProcessor = require("./processor");

exports.consume = () => {
  amqp.connect(
    `amqp://${process.env.RMQ_HOST}`,
    function (conError, connection) {
      
      if (conError) {
        //retrying connection (docker image is still starting)
        return setTimeout(() => { exports.consume(); }, 1000);
      };

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

        channel.prefetch(1);

        console.log("Waiting for messages in %s", queue);

        channel.consume(queue, function (msg) {
          let msgContent = JSON.parse(msg.content);
          console.log("Received '%s'", msgContent);
          messageProcessor.processMessage(msgContent);
          setTimeout(function () {
            channel.ack(msg);
          }, 1000);
        });
      });
    }
  );
};
