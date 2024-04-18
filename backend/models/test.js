"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class test extends Model {
    static associate(models) {
      this.hasMany(models.test_question, {
        foreignKey: "testId",
        sourceKey: "id",
      });
      this.hasMany(models.response, {
        foreignKey: "testId",
        sourceKey: "id",
      });
    }
    toJSON(){
      return {...this.get(), id: undefined}
    }
  }
  test.init(
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
      creator: {
        type: DataTypes.UUID,
        allowNull: false,
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
