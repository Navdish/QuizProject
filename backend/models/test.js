"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class test extends Model {
    static associate(models) {
      this.hasMany(models.test_question, {
        foreignKey: "testId",
        sourceKey: "id",
      });
    }
  }
  test.init(
    {
      uuid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      instruction: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "test",
    }
  );
  return test;
};
