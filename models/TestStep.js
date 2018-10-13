const mongoose = require('mongoose');
const {Schema} = mongoose;

const TestStepSchema = new Schema({
    test_step_name: {
        type: String,
    }
});

module.exports = mongoose.model('teststeps', TestStepSchema);
