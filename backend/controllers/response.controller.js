const CustomError = require('../lib/error');
const {responseService} = require('../service');


exports.addResponse = async(req, res)=> {
    try {
        const response = await responseService.addResponses({userId : req?.user?.id, data: req?.body});
        if(!response) throw new CustomError("Response not added", 500)
        res.status(200).json(response);
    } catch (error) {
        res.status(error?.code || 500).json({message : error?.message});
    }
}

exports.fetchResponse = async(req, res)=> {

    try {
        const response = await responseService.fetchResponses({userId : req?.user?.id, params: req?.params});
        if(!response) throw new CustomError("Question not fetched", 500)
        res.status(200).json(response);
    } catch (error) {
        res.status(error?.code || 500).json({message: error?.message});
    }
}
