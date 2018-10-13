const mongoose = require('mongoose');
const {Schema} = mongoose;

const LibrarySchema = new Schema({
  library_name: {
    type: String,
    required: true
  },
  test_case: {
    type: Schema.Types.ObjectId,
    ref: "TestCase"
  }
});

module.exports = mongoose.model('libraries', LibrarySchema);
