"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Notifications",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        text_en: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        text_ar: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("NOW()"),
        },
      },
      {
        charset: "utf8",
        collate: "utf8_unicode_ci",
      }
    );
    await queryInterface.bulkInsert(
      "Notifications",
      [
        {
          text_en: "TEST ENGLISH TEXT",
          text_ar: "اختبار النص العربي",
          type: "PUSH",
        },
        {
          text_en: "TEST 2",
          text_ar: "اختبار ٢",
          type: "SMS",
        },
      ],
      {}
    );

    await queryInterface.addConstraint("Notifications", {
      fields: ["type"],
      type: "check",
      where: {
        type: ["PUSH", "SMS"],
      },
      name: "Notifications_Type_checkConstraint",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Notifications");
  },
};
