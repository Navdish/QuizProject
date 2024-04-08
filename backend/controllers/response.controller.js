const CustomError = require('../lib/error');
const {responseService} = require('../service');
const jwt = require("jsonwebtoken");


exports.addResponse = async(req, res)=> {
    try {
        const response = await responseService.addResponses({userId : req?.user?.id, data: req?.body, params: req?.params});
        if(!response) throw new CustomError("Response not added", 500)
        res.status(200).json(response);
    } catch (error) {
        res.status(error?.code).json({message : error?.message});
    }
}

exports.fetchResponse = async(req, res)=> {

    try {
        const response = await responseService.fetchResponses({params: req?.params});
        if(!response) throw new CustomError("Question not fetched", 500)
        res.status(200).json(response);
    } catch (error) {
        res.status(error?.code).json({message: error?.message});
    }
}