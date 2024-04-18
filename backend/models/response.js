"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class response extends Model {
    static associate(models) {
      this.belongsTo(models.test, {
        foreignKey: "testId",
        targetKey: "id",
      });
      this.belongsTo(models.question, {
        foreignKey: "questionId",
        targetKey: "id",
      });
      this.belongsTo(models.user, {
        foreignKey: "userId",
        targetKey: "id",
      });
    }

    toJSON(){
      return {...this.get(), id: undefined, userId: undefined, testId: undefined, questionId: undefined}
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
      marks: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      correct: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      testId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "response",
    }
  );
  return response;
};
