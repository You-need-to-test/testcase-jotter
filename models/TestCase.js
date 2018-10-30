const mongoose = require("mongoose");
const { Schema } = mongoose;

const TestCaseSchema = new Schema({
  test_case: {
    type: String,
    required: true
  },

  test_steps: [
    {
      type: String
    }
  ],
  suite_id: {
    type: String
    // require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("test_cases", TestCaseSchema);
