const CustomError = require('../lib/error');
const {result_service} = require('../service');


exports.fetchResult = async(req, res)=> {
    try {
        const response = await result_service.fetchResults({userId : req?.user?.id, params: req?.params});
        if(!response) throw new CustomError("Post not added", 500)
        res.status(200).json(response);
    } catch (error) {
        res.status(error?.code || 500).json({message : error?.message});
    }
}