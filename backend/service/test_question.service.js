const CustomError = require("../lib/error");
const { test, question, test_question, user } = require("../models");
const { role_enum } = require("../lib/constants");

exports.add_test_questions = async ({ userId, data }) => {
  const user_data = await user.findOne({ where: { uuid: userId } });
  if (!user_data) throw new CustomError("User not found", 400);
  if (user_data.role !== role_enum.ADMIN)
    throw new CustomError("Not allowed", 401);
  const { testId, questionId, optional } = data;
  if (!(testId && questionId && optional))
    throw new CustomError("Incomplete credentials", 422);
  // check if the question and the test exists or not
  const test_data = await test.findOne({uuid: testId});
  if(!test_data) throw new CustomError("Test doesn't exist", 400);
  const question_data = await question.findOne({uuid: questionId});
  if(!question_data) throw new CustomError("Question doesn't exist", 400);
  const response = await test_question.create({testId: test_data.id, questionId: question_data.id, optional:optional ==="true"?true:false});
  // const response = await test_question.create({
  //     optional: optional === "true" ? true : false,
  //   }, {
  //       include: [{model: 'tests', as: 'testId', attributes:['id']}]
  //   }, {
  //     include: [{model: 'questions', as: 'questionId', attributes:['id']}]
  //   });
    console.log('response: ', response);

  if (!response) throw new CustomError("Question not created", 500);
  return response;
};
