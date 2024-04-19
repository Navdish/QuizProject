const CustomError = require("../lib/error");
const { Op } = require("sequelize");
const { response, test , user, test_question} = require("../models");

exports.fetchResults= async ({ userId, params }) => {
    const { id } = params;
    if (!id) throw new CustomError("details not found", 404);
    const test_data = await test.findOne({ where: { uuid: id } });
    if (!test_data) throw new CustomError("test not found", 404);
    const user_data = await user.findOne({where:{uuid: userId}});
    const test_question_data = await test_question.findAll({where: {testId: test_data.id}})
    const filtered = test_question_data.map((ting)=> {
      return ting.id;
    })
    if (!user_data) throw new CustomError("user not found", 404);
    const responses_data = await response.findAll({
      where: {  userId: user_data.id, test_questionId : {[Op.in]: filtered}},
    });
    if (!responses_data) throw new CustomError("Response not found", 404);
    var total_marks = 0;
    responses_data.map((re)=> {
      total_marks += re.marks;
    })
    return {marks : total_marks};
};
  