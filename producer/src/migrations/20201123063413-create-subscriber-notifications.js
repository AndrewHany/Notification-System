'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Product belongsToMany Tag
    return queryInterface.createTable("SubscriberNotifications", {
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
      SubscriberId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "Subscribers",
          key: "id",
        },
      },
      NotificationId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "Notifications",
          key: "id",
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SubscriberNotifications');
  }
};
