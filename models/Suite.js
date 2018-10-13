const mongoose = require('mongoose');
const {Schema} = mongoose;

const SuiteSchema = new Schema({
    suite_name: {
        type: String,
        required: true
    },
    test_case: [
        {
            type: Schema.Types.ObjectId,
            ref: "TestCase"
        }
    ]
});

module.exports = mongoose.model('suites', SuiteSchema);
