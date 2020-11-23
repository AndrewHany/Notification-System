exports.Send = (messages) => {
  messages.forEach((message) => {
    console.log(
      `push notification sent ${message.text} to device:${message.deviceToken} of type ${message.deviceType}`
    );
  });
};
