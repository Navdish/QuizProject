"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("responses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user", 
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      response: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      marks: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      correct: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      test_questionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "test_questions", 
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("responses");
  },
};
