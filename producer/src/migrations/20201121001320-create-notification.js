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
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("NOW()"),
        }
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
        },
        {
          text_en: "TEST 2",
          text_ar: "اختبار ٢",
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Notifications");
  },
};
