const mongoose = require('mongoose')

const Response = mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    testId: {
        type: String,
        require: true
    },
    marks: {
        type: Number,
        require: true
    },
    totalMarks: {
        type: Number,
        require: true
    },
    
}, {timestamps: true, strict: false})


const Responses =  mongoose.model('ResponseModel', Response);
module.exports = Responses;