"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("article", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      author_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      thumbnail_type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      thumbnail_color: {
        type: Sequelize.STRING(20000),
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING(20000),
      },
      tag: {
        type: Sequelize.STRING(20000),
      },
      ingredient: {
        type: Sequelize.STRING(20000),
      },
      like_user_id: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("article");
  },
};
