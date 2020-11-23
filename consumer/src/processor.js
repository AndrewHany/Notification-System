const smsProvider = require("./providers/sms.provider");
const pushNotificationProvider = require("./providers/pushNotification.provider");

exports.processMessage = (queueMessage) => {
    const { users } = queueMessage;
    const msg = { text_en: queueMessage.text_en, text_ar: queueMessage.text_ar };

    if (msg && users) {
        switch (queueMessage.type) {
            case "SMS":
                smsProvider.Send(constructSms(msg, users));
                break;
            case "PUSH":
                pushNotificationProvider.Send(constructPushNotification(msg, users));
                break;
            default:
                console.log("message type not supported");
                return;
        }
    }
}

function getPreferredLanguageMessage(msg, language) {
    return language == "en" ? msg.text_en : msg.text_ar;
}

function constructSms(msg, users) {
  return users.map((u) => ({
    phoneNumber: u.phoneNumber,
    text: getPreferredLanguageMessage(msg, u.language),
  }));
}

function constructPushNotification(msg, users) {
  return users.map((u) => ({
    deviceToken: u.deviceToken,
    deviceType: u.deviceType,
    text: getPreferredLanguageMessage(msg, u.language),
  }));
}