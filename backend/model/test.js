const mongoose = require('mongoose');
const Users = require('./users');

const Test = mongoose.Schema({
    creator : {
        type : String,
        ref : Users,
        require: true
    },
    testName: {
        type: String,
        require: true
    },
    timeAlloted: {
        type: Number,
    }
}, {timestamps: true} )

const Tests =  mongoose.model('PostModel', Test);
module.exports = Tests;