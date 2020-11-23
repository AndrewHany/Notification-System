const amqp = require("amqplib/callback_api");
const translate = require("translate");

exports.consume = () => {
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
          
      channel.prefetch(1);

      console.log("Waiting for messages in %s", queue);
        
      channel.consume(queue, function (msg) {
        let msgContent = msg.content.toString();
        console.log("Received '%s'", msgContent);
        
        setTimeout(function () {
          channel.ack(msg);
        }, 1000);
      });
    });
  });

}