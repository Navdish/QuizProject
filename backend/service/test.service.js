const CustomError = require("../lib/error");
const { test } = require("../models");
const {User} = require("../model")

exports.addTests = async ({ userId, data }) => {
  const { testName, instructions } = data;
  if (!testName) throw new CustomError("details not found", 404);
  const response = await test.create({ creator: userId,title: testName,instruction: instructions });
  if (!response) throw new CustomError("Post not created", 500);
  return response;
};


exports.fetchTests = async ({ userId, query }) => {
  const user = await User.findById(userId);
  if (!user) throw new CustomError("User not found", 400);
  if (user?.role === "ADMIN") {
    const response = await test.findAll({ creator: userId });
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
