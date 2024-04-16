const CustomError = require('../lib/error');
const {test, question, test_question} = require('../models');
const {User} = require("../model")
const {role_enum} = require('../lib/constants')

exports.addQuestions = async({userId, data})=>{
    const user = await User.findById(userId);
    if(!user) throw new CustomError("User not found", 400);
    const {option, description, answer, weightage} = data;
    if(user.role === role_enum.STUDENT) throw new CustomError("Not allowed", 401);
    const response = await question.create({options: option, description, answer, weightage: Number(weightage)});
    if(!response) throw new CustomError("Question not created", 500);
    if(data.optional && data.testId) {
        console.log("Got in ")
        const {optional, testId} = data;
        const relation = await test_question.create({testId, optional, questionId:response.dataValues.id });
        if(!relation) throw new CustomError("Through table not created", 500);
        console.log("relation", relation);
    }
    console.log("Got out ")
    return response;
}

exports.fetchQuestions = async({ params})=> {
    console.log("quesyidwd", params)
    const {id} = params;
    if(!id) throw new CustomError("details not found", 404);
    if(id == -1) {
        console.log("id", id);
        const response = await question.findAll();
        console.log("nxsajxk", response);
        if(!response) throw new CustomError("Questions not found", 404);
        if(response.length === 0) throw new CustomError("No questions", 204);
        return response;
    }
    console.log("get questions by testId", id);
    const response = await test_question.findAll({ testId: id, include: ['question']});
    if(!response) throw new CustomError("Questions not found", 404);
    if(response.length === 0) throw new CustomError("No questions", 204);
    console.log("napaak", response);
    return response;
}