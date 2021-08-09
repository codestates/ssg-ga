'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      author_id: {
        type: Sequelize.STRING
      },
      thumbnail_type: {
        type: Sequelize.STRING
      },
      thumbnail_color: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      tag: {
        type: Sequelize.STRING
      },
      ingredient: {
        type: Sequelize.STRING
      },
      like_user_id: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('articles');
  }
};