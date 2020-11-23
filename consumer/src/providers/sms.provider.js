exports.Send = (messages) => {
    messages.forEach(message => {
        console.log(`sms sent ${message.text} to ${message.phoneNumber}`);
    });
};