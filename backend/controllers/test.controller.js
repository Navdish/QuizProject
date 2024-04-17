const CustomError = require('../lib/error');
const {testService} = require('../service');


exports.addTest = async(req, res)=> {
    try {
        const response = await testService.addTests({userId : req?.user?.id, data: req?.body});
        if(!response) throw new CustomError("Post not added", 500)
        res.status(200).json(response);
    } catch (error) {
        res.status(error?.code || 500).json({message : error?.message});
    }
}

exports.fetchTest = async(req, res)=> {
    try {
        const response = await testService.fetchTests({userId: req?.user?.id, query : req?.query});
        if(!response) throw new CustomError("tests not fetched", 500)
        res.status(200).json(response);
    } catch (error) {
        res.status(error?.code || 500).json({message : error?.message});
    }
}
