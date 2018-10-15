const mongoose = require('mongoose');
const {Schema} = mongoose;

const TestCaseSchema = new Schema({
    test_case: {
        type: String,
        required: true
    },
    test_steps: [
        {
            type: Schema.Types.ObjectId,
            ref: "test_steps"
        }
    ]
});

module.exports = mongoose.model('test_cases', TestCaseSchema);
