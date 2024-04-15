'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({test, test_question}) {
      // define association here
      // this.belongsToMany(test, { through: test_question });
      this.hasMany(test_question, {foreignKey:'questionId', sourceKey:'id'});
    }
  }
  question.init({
    options:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    answer: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    weightage: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'question',
  });
  return question;
};