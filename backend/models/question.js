"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    static associate(models) {
      this.hasMany(models.test_question, {
        foreignKey: "questionId",
        sourceKey: "id",
      });
    }
  }
  question.init(
    {
      uuid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      options: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      answer: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      weightage: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "question",
    }
  );
  return question;
};
