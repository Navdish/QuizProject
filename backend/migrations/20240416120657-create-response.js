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
          model: "user", // name of Source model
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      response: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      question_marks: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      correct: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      testId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "test", // name of Source model
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "question", // name of Source model
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
