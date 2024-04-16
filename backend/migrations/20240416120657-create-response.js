'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('responses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      response: {
        type: Sequelize.STRING,
        allowNull: false
      },
      question_marks: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      correct: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      test_questionId: {
        type: Sequelize.INTEGER,
        allowNull:false
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('responses');
  }
};