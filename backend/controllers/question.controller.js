const CustomError = require('../lib/error');
const {questionService} = require('../service');


exports.addQuestion = async(req, res)=> {
    try {
        const response = await questionService.addQuestions({userId : req?.user?.id, data: req?.body});
        if(!response) throw new CustomError("Question not added", 500)
        res.status(200).json(response);
    } catch (error) {
        res.status(error?.code || 500).json({message : error?.message});
    }
}

exports.fetchQuestion = async(req, res)=> {

    try {
        const response = await questionService.fetchQuestions({params: req?.params});
        if(!response) throw new CustomError("Question not fetched", 500)
        res.status(200).json(response);
    } catch (error) {
        res.status(error?.code|| 500).json({message: error?.message});
    }
}