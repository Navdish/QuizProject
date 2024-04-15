const mongoose = require('mongoose')

const Question = mongoose.Schema({
    testId: {
        type: String,
        require: true
    },
    question: {
        type: String,
        require: true
    },
    option1: {
        type: String,
        require: true
    },
    option2: {
        type: String,
        require: true
    },
    option3: {
        type: String,
        require: true
    },
    option4: {
        type: String,
        require: true
    },
    answer: {
        type: Number,
        require: true
    },
    weightage: {
        type: Number,
        require: true
    }
}, {timestamps: true})


const Questions =  mongoose.model('QuestionModel', Question);
module.exports = Questions;