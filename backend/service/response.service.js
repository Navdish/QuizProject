const CustomError = require('../lib/error');
const {Response, Test, Question, User} = require('../model');

exports.addResponses = async({userId, data, params})=>{
    console.log("response service")
    const user = await User.findById(userId);
    if(!user) throw new CustomError("User not found", 400);
    if(user.role !== 'STUDENT') throw new CustomError("Not allowed", 401);
    const {id} = params;
    console.log("response service2", data, params)

    const {totalMarks, responses} = data;
    const questionResponse = await Question.find({testId: id});
    var marks = 0;
    questionResponse.map((q)=> {
        if(responses[q._id])
        {
            const str = `option${q.answer}`;
            if(responses[q._id][0] === String(q[str]))
            {marks += q.weightage;
            responses[q._id].push(true);}
            else if(responses[q._id]) responses[q._id].push(false);
        }
    })
    console.log("response service2")
    const response = await Response.create({userId, testId: id, marks, totalMarks, questions: responses});
    if(!response) throw new CustomError("Question not created", 500);
    return response;
}

exports.fetchResponses = async({ params})=> {
    const {id} = params;
    if(!id) throw new CustomError("details not found", 404);
    const test = await Test.findById(id);
    if(!test) throw new CustomError ("test not found", 404);
    const responses = await Response.find({testId: id});
    if(!responses) throw new CustomError("Response not found", 404);
    if(responses.length === 0) throw new CustomError("No questions", 204);
    return responses;
}