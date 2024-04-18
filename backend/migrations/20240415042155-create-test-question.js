"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("test_questions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      optional: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      testId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tests',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'question', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable("test_questions");
  },
};
