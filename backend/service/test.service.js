const CustomError = require("../lib/error");
const { test } = require("../models");
const {user} = require("../models")

exports.addTests = async ({ userId, data }) => {
  console.log(data);
  const { testName, instructions } = data;
  if (!testName || !instructions) throw new CustomError("details not found", 404);
  const response = await test.create({ creator: userId,title: testName,instruction: instructions });
  if (!response) throw new CustomError("Post not created", 500);
  console.log(response);
  return response;
};


exports.fetchTests = async ({ userId, query }) => {
  console.log("userId", userId);
  const user_data = await user.findOne({where :{uuid : userId}});
  if (!user_data) throw new CustomError("User not found", 400);
  if (user_data?.role === "ADMIN") {
    const response = await test.findAll({where :{ creator: userId }});
    if (!response) throw new CustomError("Not found", 404);
    if (response.length === 0)
      throw new CustomError("Tests not available", 204);
    return response;
  }
  const response = await test.findAll();
  if (!response) throw new CustomError("Not found", 404);
  if (response.length === 0) throw new CustomError("Tests not available", 204);
  return response;
};
