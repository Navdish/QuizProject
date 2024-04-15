const CustomError = require('../lib/error');
const {test, question, test_question} = require('../models');
const {User} = require("../model")

exports.addQuestions = async({userId, data})=>{
    const user = await User.findById(userId);
    if(!user) throw new CustomError("User not found", 400);
    console.log(user);
    const {option, description, answer, weightage} = data;
    console.log("working.....", data);
    if(user.role === 'STUDENT') throw new CustomError("Not allowed", 401);
    const response = await question.create({options: option, description, answer, weightage: Number(weightage)});
    console.log("Question response = ",response);
    if(!response) throw new CustomError("Question not created", 500);
    if(data.optional) {
        const {optional, testId} = data;
        //create test-question with testId from data, questionId from response.dataValues.id
        const relation = await test_question.create({testId, optional, questionId:response.dataValues.id });
        if(!relation) throw new CustomError("Through table not created", 500);
        console.log("relation", relation);
    }
    return response;
}

exports.fetchQuestions = async({ params})=> {
    console.log("quesyidwd", params)
    const {id} = params;
    if(!id) throw new CustomError("details not found", 404);
    

    
    const response = await test_question.findAll({ testId: id, include: ['question']});
    if(!response) throw new CustomError("Questions not found", 404);
    console.log("questions from test-question ", response);
    if(response.length === 0) throw new CustomError("No questions", 204);
    return response;
}