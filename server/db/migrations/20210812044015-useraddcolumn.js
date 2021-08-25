"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("user", "social", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("user", "social");
  },
};
