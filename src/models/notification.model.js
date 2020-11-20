module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "notification",
    {
      text_en: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      text_ar: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_unicode_ci",
    }
  );
  return Notification;
};
