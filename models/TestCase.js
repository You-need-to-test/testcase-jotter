const mongoose = require('mongoose');
const {Schema} = mongoose;

const TestCaseSchema = new Schema({
  testcase_name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('testcases', TestCaseSchema);
