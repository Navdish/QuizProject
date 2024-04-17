"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class response extends Model {
    static associate(models) {
      this.belongsTo(models.test_question, {
        foreignKey: "test_questionId",
        targetKey: "id",
      });
      this.belongsTo(models.user, {
        foreignKey: "userId",
        targetKey: "id",
      });
    }

    toJSON(){
      return {...this.get(), id: undefined, userId: undefined, test_questionId: undefined}
    }
  }
  response.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      uuid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
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
