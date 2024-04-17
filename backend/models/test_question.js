"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class test_question extends Model {
    static associate(models) {
      this.belongsTo(models.test, { foreignKey: "testId", targetKey: "id" });
      this.belongsTo(models.question, {
        foreignKey: "questionId",
        targetKey: "id",
      });
      this.hasMany(models.response, {
        foreignKey: "test_questionId",
        sourceKey: "id",
      });
    }
  }
  test_question.init(
    {
      uuid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      optional: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      testId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      questionId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "test_question",
    }
  );
  return test_question;
};
