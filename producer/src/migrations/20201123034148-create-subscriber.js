'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Subscribers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userToken: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deviceToken: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deviceType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      language: {
        allowNull: false,
        type: Sequelize.CHAR(2),
        defaultValue: "en",
      },
      phoneNumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isDeviceActive: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW() ON UPDATE NOW()"),
      },
    });
    
    await queryInterface.addConstraint("Subscribers", {
      fields: ["deviceType"],
      type: "check",
      where: {
        deviceType: ["android", "ios"],
      },
      name: "Subscribers_deviceType_checkConstraint",
    });

    await queryInterface.addConstraint('Subscribers', {
      fields: ['language'],
      type: 'check',
      where: {
        language: ['en', 'ar']
      },
      name:'Subscribers_language_checkConstraint'
    });
    
    await queryInterface.addConstraint("Subscribers", {
      fields: ["userToken", "deviceToken"],
      type: 'unique'
    });

    await queryInterface.bulkInsert("Subscribers", [
      {
        userToken: "GciOiJIUzI1NiIsInR5cCI",
        deviceToken:
          "APA91bFoi3lMMre9G3XzR1LrF4ZT82_15MsMdEICogXSLB8-MrdkRuRQFwNI5u8Dh0cI90ABD3BOKnxkEla8cGdisbDHl5c",
        deviceType: "android",
        language: "en",
        phoneNumber: "01234567891",
      },
      {
        userToken: "AEiQisfUzI1GaiIczxR5fCI",
        deviceToken:
          "APA91bFoi3lMMre9G3XzR1LrF8aslh12_15MsMdEICogXSLB8-M012512912asglaDh0cI90ABD3BOKnxkEla8cGdisbDHl5c",
        deviceType: "ios",
        language: "ar",
        phoneNumber: "01034567892",
      },
      {
        userToken: "0172hasdUzI1NiASCsInjasgl",
        deviceToken:
          "AHJLshag2bn12Vlaslh121o2fallfZT82_15MsMdEICogXSLB8-MrdkRuRQFwNI5u8ASDJHAShaskgksaga29aa8cGdisbDHl5c",
        deviceType: "ios",
        language: "en",
        phoneNumber: "01534567893",
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Subscribers');
  }
};