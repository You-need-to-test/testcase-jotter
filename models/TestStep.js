const mongoose = require('mongoose');
const {Schema} = mongoose;

const TestStepSchema = new Schema({
    test_step: {
        type: String,
    }
});

module.exports = mongoose.model('test_steps', TestStepSchema);
