"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class response extends Model {
    static associate(models) {
      this.belongsTo(models.test_question, {
        foreignKey: "test_questionId",
        targetKey: "id",
      });
    }
  }
  response.init(
    {
      uuid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      response: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      question_marks: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      correct: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      test_questionId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "response",
    }
  );
  return response;
};
