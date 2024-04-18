const CustomError = require("../lib/error");
const { response, test, question, user, test_question } = require("../models");

exports.addResponses = async ({ userId, data }) => {
  const user_data = await user.findOne({ where: { uuid: userId } });
  if (!user_data) throw new CustomError("User not found", 400);
  if (user_data.role !== "STUDENT") throw new CustomError("Not allowed", 401);

  const question_from_test_question = await test_question.findOne({
    where: { uuid: data.test_questionId },
    include: ["question"],
  });

  if (!question_from_test_question.question.options.includes(data.response))
    throw new CustomError("Bad Request", 400);
  const correct =
    data.response === question_from_test_question.question.answer
      ? true
      : false;
  var computed_marks;


  if (correct === true){
    computed_marks = question_from_test_question.question.weightage;
  }else {
    if (question_from_test_question.optional === true) computed_marks = -question_from_test_question.question.weightage;
    else computed_marks = 0;
  }

  const [response_data, created] = await response.findOrCreate({
    where: {
      userId: user_data.id,
      testId: question_from_test_question.testId,
      questionId: question_from_test_question.questionId,
    },
    defaults: { correct, response: data.response, marks: computed_marks },
  });
  if (!created) {
    response_data.correct = correct;
    response_data.response = data.response;
    response_data.marks = computed_marks;
    await response_data.save();
  }

  console.log(computed_marks, "computed_marks", correct);
  if (!response_data) throw new CustomError("Question not created", 500);
  return response_data;
};

exports.fetchResponses = async ({ userId, params }) => {
  const { id } = params;
  if (!id) throw new CustomError("details not found", 404);
  const test_question_data = await test_question.findOne({
    where: { uuid: id },
  });

  const user_data = await user.findOne({ where: { uuid: userId } });

  if (!test_question_data) throw new CustomError("test not found", 404);
  const responses_data = await response.findOne({
    where: {
      testId: test_question_data.testId,
      questionId: test_question_data.questionId,
      userId: user_data.id,
    },
  });
  if (!responses_data) throw new CustomError("Response not found", 404);
  if (responses_data.length === 0) throw new CustomError("No questions", 204);
  return responses_data;
};
