'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class test_question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({test, question}) {
      // define association here
      this.belongsTo(test, {foreignKey:'testId', targetKey:'id'});
      this.belongsTo(question, {foreignKey:'questionId', targetKey:'id'});
    }
  }
  test_question.init({
    optional: {
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
  }, {
    sequelize,
    modelName: 'test_question',
  });
  return test_question;
};