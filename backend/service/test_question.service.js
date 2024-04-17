const CustomError = require('../lib/error');
const {test, question, test_question} = require('../models');
const {User} = require("../model")
const {role_enum} = require('../lib/constants');
const { INTEGER } = require('sequelize');

exports.add_test_questions = async({userId, data})=>{
    const user = await User.findById(userId);
    if(!user) throw new CustomError("User not found", 400);
    if(user.role !== role_enum.ADMIN) throw new CustomError("Not allowed", 401);
    const {testId, questionId, optional} = data;
    if(!(testId && questionId && optional)) throw new CustomError("Incomplete credentials", 422); 
    // check if the question and the test exists or not
    const response = await test_question.create({testId: Number(testId), questionId: Number(questionId), optional:optional ==="true"?true:false});
    if(!response) throw new CustomError("Question not created", 500);
    console.log("test_question response", response);
    return response;
}