const CustomError = require("../lib/error");
const { response, test , user} = require("../models");

exports.fetchResults= async ({ userId, params }) => {
    const { id } = params;
    if (!id) throw new CustomError("details not found", 404);
    const test_data = await test.findOne({ where: { uuid: id } });
    if (!test_data) throw new CustomError("test not found", 404);
  
    const user_data = await user.findOne({where:{uuid: userId}});
    if (!user_data) throw new CustomError("user not found", 404);
    
    const responses_data = await response.findAll({
      where: { testId: test_data.id, userId: user_data.id },
    });
    if (!responses_data) throw new CustomError("Response not found", 404);
    var total_marks = 0;
    responses_data.map((re)=> {
      total_marks += re.marks;
    })
    return {marks : total_marks};
};
  