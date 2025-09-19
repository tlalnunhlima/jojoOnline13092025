
const mongoose = require('mongoose')

const Schema = mongoose.Schema

var uniqueValidator = require('mongoose-unique-validator')

const testScoreSchema = new Schema({
    
    nameOfSubject: {
        type: String,
        required: [true, 'Please answer the question'],
        index: true   // 👈 speeds up queries on this field
    },
    chapterNo: {
       type: String,
       required: [true, 'Please answer the question']
    },
    assignmentNo1: {
        type: String,
        required: [true, 'Please answer the question']
    },
    assignmentNo2: {
        type: String,
        required: [true, 'Please answer the question']
    },
    assignmentNo3: {
        type: String,
        required: [true, 'Please answer the question']
    },
    assignmentNo4: {
        type: String,
        required: [true, 'Please answer the question']
    },
    assignmentNo5: {
        type: String,
        required: [true, 'Please answer the question']
    },
    markObtained: {
        type: String,
        required: [true, 'Please answer the question']
    },
    totalMark: {
        type: String,
        required: [true, 'Please answer the question']
    },
    datePosted: {
        type: Date,
        default: Date.now
    }
});

//duplicate checker
testScoreSchema.plugin(uniqueValidator);



//export model
const testScore = mongoose.model('testScore', testScoreSchema)

module.exports = testScore
