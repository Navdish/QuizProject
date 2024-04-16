'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class response extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.test_question, {foreignKey:'test_questionId', targetKey:'id'})
    }
  }
  response.init({
    name:{
      type: DataTypes.STRING,
      allowNull:false
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    response: {
      type: DataTypes.STRING,
      allowNull: false
    },
    question_marks: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    test_questionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    } 
  }, {
    sequelize,
    modelName: 'response',
  });
  return response;
};