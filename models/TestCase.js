const mongoose = require('mongoose');
const {Schema} = mongoose;

const TestCaseSchema = new Schema({
    test_case: {
        type: String,
        required: true
    },
    test_steps: [
        {
            type: String,
        }
    ]
});

module.exports = mongoose.model('test_cases', TestCaseSchema);
