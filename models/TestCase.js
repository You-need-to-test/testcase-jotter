const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestCaseSchema = new mongoose.Schema({
  testcase_name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('library', TestCaseSchema);
