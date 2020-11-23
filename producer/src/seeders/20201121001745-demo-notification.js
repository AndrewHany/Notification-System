"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
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
    await queryInterface.bulkDelete("Notifications", null, {});
  },
};
