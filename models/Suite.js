const mongoose = require('mongoose');
const {Schema} = mongoose;

const SuiteSchema = new Schema({
    suite_name: {
        type: String,
        required: true
    },
    test_cases: [
        {
            type: Schema.Types.ObjectId,
            ref: "test_cases"
        }
    ]
});

module.exports = mongoose.model('suites', SuiteSchema);
