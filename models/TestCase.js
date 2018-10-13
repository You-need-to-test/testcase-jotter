const mongoose = require('mongoose');
const {Schema} = mongoose;

const TestCaseSchema = new Schema({
    test_case_name: {
        type: String,
        required: true
    },
    test_step: [
        {
            type: Schema.Types.ObjectId,
            ref: "TestStep"
        }
    ]
});

module.exports = mongoose.model('testcases', TestCaseSchema);
