const CustomError = require("../lib/error");
const { Test, User } = require("../models");

exports.addTests = async ({ userId, data }) => {
  const { testName } = data;
  if (!testName) throw new CustomError("details not found", 404);
  const response = await Test.create({ creator: userId, testName });
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
  const user = await User.findById(userId);
  console.log("user ...")
  if (!user) throw new CustomError("User not found", 400);
  // console.log(user);
  if (user?.role === "ADMIN") {
    const response = await Test.find({ creator: userId });
    if (!response) throw new CustomError("Not found", 404);
    if (response.length === 0)
      throw new CustomError("Tests not available", 204);
    return response;
  }
  const response = await Test.find();
  if (!response) throw new CustomError("Not found", 404);
  if (response.length === 0) throw new CustomError("Tests not available", 204);
  return response;
};

// exports.fetchPost = async({query})=> {

//     const {time} = query;
//     // { createdAt: { $lt: (new Date(time)) } }
//     // .sort({createdAt: -1})
//     // const time = query.createdAt;
//     // if(!time) throw new CustomError("Time not given", 404)
//     console.log("time", time);
//     if(time == 1)
//     {
//         const response = await Post.find().limit(4).populate("userId", ["name", "description"]).sort({ createdAt: -1 });
//         console.log("response",response);
//         if(!response) throw new CustomError("Data not found", 204);
//         return response;
//     }
//     const response = await Post.find({ createdAt: { $lt: (new Date(time)) } }).limit(4).populate("userId", ["name", "description"]).sort({ createdAt: -1 });
//     console.log(response);
//     // using aggregation to fetch no. of likes and comments on a post
//     if(!response) throw new CustomError("Data not found", 204);
//     return response;

// (page, count_users, filter_value, sort_value, search)
// if(search === "")
// {
//     if(filter_value === "All"){
//         // console.log(sort_value);
//         return model.User.find().sort(sort_value).skip((page-1)*count_users).limit(count_users);
//     }
//     else {
//         return model.User.find({role : filter_value}).sort(sort_value).skip((page-1)*count_users).limit(count_users);
//     }
// }
// else {
//     if(filter_value === "All"){
//         return model.User.find({
//             "$or":
//             [
//                 {"name" : {$regex:search,  $options: 'i'}}
//             ]
//         }).sort(sort_value).skip((page-1)*count_users).limit(count_users);
//     }
//     else {
//         return model.User.find({name: search, role : filter_value}).sort(sort_value).skip((page-1)*count_users).limit(count_users);
//     }
// }

// }

exports.updatePost = async ({ tokenUserId, body, params }) => {
  const { postId } = params;
  if (!postId) throw new CustomError("Post id not available", 400);
  const post = await Post.findById(postId);
  if (!post) throw new CustomError("Post with this _id doesn't exist", 400);
  if (post.userId !== tokenUserId)
    throw new CustomError("User not authorized to update", 401);
  // it should not contain different userId
  const { userId } = body;
  if (userId && userId !== tokenUserId)
    throw new CustomError(
      "bad request, trying to change the userId of post",
      400
    );
  const response = await Post.findByIdAndUpdate(postId, body, { new: true });
  if (!response) throw new CustomError("Post not updated", 500);
  return response;
};

exports.deletePost = async ({ userId, params }) => {
  const { postId } = params;
  if (!postId) throw new CustomError("Post id not available", 400);
  const post = await Post.findById(postId);
  if (!post) throw new CustomError("Post doesn't exist", 404);
  if (post.userId !== userId)
    throw new CustomError("(Not authorized) Cannot delete post", 403);
  const response = await Post.deleteOne({ _id: postId });
  const delComment = await Comment.deleteMany({ postId });
  const delReaction = await Reaction.deleteMany({ postId });
  return response;
};
