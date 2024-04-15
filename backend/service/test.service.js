const CustomError = require("../lib/error");
const { test } = require("../models");
const {User} = require("../model")

exports.addTests = async ({ userId, data }) => {
  console.log("daataa in add test service ",data)
  const { testName, instructions } = data;
  if (!testName) throw new CustomError("details not found", 404);
  const response = await test.create({ creator: userId,title: testName,instruction: instructions });
  if (!response) throw new CustomError("Post not created", 500);
  return response;
};

// exports.addTests = async({userId, files, data})=>{
//     let photos = [];
//     const {title, body} = data;
//     if(!(title && body )) throw new CustomError("details not found", 404);
//     photos = files?.map((x)=> x.path);
//     const response = await Post.create({userId, title, body, photos});
//     if(!response) throw new CustomError("Post not created", 500);
//     const newPost = await Post.findById(response._id).populate("userId", ["name", "description"]);
//     if(!newPost) throw new CustomError("internal Server Error", 500);
//     return newPost;
// }

exports.fetchTests = async ({ userId, query }) => {
  console.log("user details service ")
  const user = await User.findById(userId);
  console.log("user ...")
  if (!user) throw new CustomError("User not found", 400);
  // console.log(user);
  if (user?.role === "ADMIN") {
    console.log("user 2...")
    const response = await test.findAll({ creator: userId });
    if (!response) throw new CustomError("Not found", 404);
    console.log("response of fetch tests ", response);
    if (response.length === 0)
      throw new CustomError("Tests not available", 204);
    return response;
  }
  console.log("user 2...")
  const response = await test.findAll();
  if (!response) throw new CustomError("Not found", 404);
  if (response.length === 0) throw new CustomError("Tests not available", 204);
  return response;
};


// exports.updatePost = async ({ tokenUserId, body, params }) => {
//   const { postId } = params;
//   if (!postId) throw new CustomError("Post id not available", 400);
//   const post = await Post.findById(postId);
//   if (!post) throw new CustomError("Post with this _id doesn't exist", 400);
//   if (post.userId !== tokenUserId)
//     throw new CustomError("User not authorized to update", 401);
//   // it should not contain different userId
//   const { userId } = body;
//   if (userId && userId !== tokenUserId)
//     throw new CustomError(
//       "bad request, trying to change the userId of post",
//       400
//     );
//   const response = await Post.findByIdAndUpdate(postId, body, { new: true });
//   if (!response) throw new CustomError("Post not updated", 500);
//   return response;
// };

// exports.deletePost = async ({ userId, params }) => {
//   const { postId } = params;
//   if (!postId) throw new CustomError("Post id not available", 400);
//   const post = await Post.findById(postId);
//   if (!post) throw new CustomError("Post doesn't exist", 404);
//   if (post.userId !== userId)
//     throw new CustomError("(Not authorized) Cannot delete post", 403);
//   const response = await Post.deleteOne({ _id: postId });
//   const delComment = await Comment.deleteMany({ postId });
//   const delReaction = await Reaction.deleteMany({ postId });
//   return response;
// };
