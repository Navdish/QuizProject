const CustomError = require('../lib/error');
const {test, question, test_question} = require('../models');
const {user} = require("../models")
const {role_enum} = require('../lib/constants')

exports.addQuestions = async({userId, data})=>{
    const user_data = await user.findOne({where:{uuid: userId}});
    if(!user_data) throw new CustomError("User not found", 400);
    const {option, description, answer, weightage} = data;
    if(user_data.role === role_enum.STUDENT) throw new CustomError("Not allowed", 401);
    const response = await question.create({options: option, description, answer, weightage: Number(weightage)});
    if(!response) throw new CustomError("Question not created", 500);
    if(data.optional && data.testId) {
        const {optional, testId} = data;
        const test_data = await test.findOne({where: {uuid: testId}});
        const relation = await test_question.create({testId: test_data.id, optional, questionId:response.dataValues.id });
        if(!relation) throw new CustomError("Through table not created", 500);
    }
    return response;
}

exports.fetchQuestions = async({ params})=> {
    const {id} = params;
    if(!id) throw new CustomError("details not found", 404);
    if(id == -1) {
        const response = await question.findAll();
        if(!response) throw new CustomError("Questions not found", 404);
        if(response.length === 0) throw new CustomError("No questions", 204);
        return response;
    }
    const test_data = await test.findOne({where: {uuid: id}});
    const response = await test_question.findAll({where:{testId: test_data.id}, include: 'question'});
    if(!response) throw new CustomError("Questions not found", 404);
    if(response.length === 0) throw new CustomError("No questions", 204);
    return response;
}