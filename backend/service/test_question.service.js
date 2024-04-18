const CustomError = require('../lib/error');
const {test, question, test_question, user} = require('../models');
const {role_enum} = require('../lib/constants');

exports.add_test_questions = async({userId, data})=>{
    const user_data = await user.findOne({where:{uuid : userId}});
    if(!user_data) throw new CustomError("User not found", 400);
    if(user_data.role !== role_enum.ADMIN) throw new CustomError("Not allowed", 401);
    const {testId, questionId, optional} = data;
    if(!(testId && questionId && optional)) throw new CustomError("Incomplete credentials", 422); 
    // check if the question and the test exists or not
    const response = await test_question.create({testId: Number(testId), questionId: Number(questionId), optional:optional ==="true"?true:false});
    if(!response) throw new CustomError("Question not created", 500);
    return response;
}