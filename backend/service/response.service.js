const CustomError = require('../lib/error');
const {response, test, question, user} = require('../models');

exports.addResponses = async({userId, data, params})=>{
    console.log("response service")
    const user_data = await user.findOne({where :{uuid : userId}});
    if(!user_data) throw new CustomError("User not found", 400);
    if(user_data.role !== 'STUDENT') throw new CustomError("Not allowed", 401);
    const {id} = params;

    const {totalMarks, responses} = data;
    const questionResponse = await test_question.findAll({where : {testId: id}});
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
    const response = await response.create({userId, testId: id, marks, totalMarks, questions: responses});
    if(!response) throw new CustomError("Question not created", 500);
    return response;
}

exports.fetchResponses = async({ params})=> {
    const {id} = params;
    if(!id) throw new CustomError("details not found", 404);
    const test_data = await test.findOne({where : {uuid : id}});
    if(!test_data) throw new CustomError ("test not found", 404);
    const responses_data = await response.findAll({where :{test_questionId: id}});
    if(!responses_data) throw new CustomError("Response not found", 404);
    if(responses_data.length === 0) throw new CustomError("No questions", 204);
    return responses_data;
}