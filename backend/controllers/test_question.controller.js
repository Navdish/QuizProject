const CustomError = require('../lib/error');
const {test_question_service} = require('../service');


exports.add_test_question = async(req, res)=> {
    try {
        const response = await test_question_service.add_test_questions({userId : req?.user?.id, data: req?.body});
        if(!response) throw new CustomError("Post not added", 500)
        res.status(200).json(response);
    } catch (error) {
        res.status(error?.code||500).json({message : error?.message});
    }
}
