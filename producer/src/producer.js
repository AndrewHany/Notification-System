const amqp = require("amqplib/callback_api");

exports.sendToQueue = (msg) => {
    amqp.connect(`amqp://${process.env.RMQ_HOST}`, function (conError, connection) {
        
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
          
        channel.sendToQueue(queue, Buffer.from(msg), {
          persistent: true,
        });
          
        console.log("Sent '%s'", msg);
      });        
    });
} 