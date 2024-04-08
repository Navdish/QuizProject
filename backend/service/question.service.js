const CustomError = require('../lib/error');
const {Test, Question, User} = require('../models');

exports.addQuestions = async({userId, data})=>{
    const user = await User.findById(userId);
    if(!user) throw new CustomError("User not found", 400);
    console.log(user);
    if(user.role === 'STUDENT') throw new CustomError("Not allowed", 401);
    // console.log("Add a qs 2", {...data,  weightage: Number(data.weightage)})
    const response = await Question.create({...data, answer: Number(data.answer), weightage: Number(data.weightage)});
    if(!response) throw new CustomError("Question not created", 500);
    return response;
}

exports.fetchQuestions = async({ params})=> {
    console.log("quesyidwd]", params)
    const {id} = params;
    if(!id) throw new CustomError("details not found", 404);
    const test = await Test.findById(id);
    if(!test) throw new CustomError ("test not found", 404);
    const response = await Question.find({testId: id});
    if(!response) throw new CustomError("Questions not found", 404);
    if(response.length === 0) throw new CustomError("No questions", 204);
    return response;
}