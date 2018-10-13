const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LibrarySchema = new mongoose.Schema({
  library_name: {
    type: String,
    required: true
  },
  test_case: {
    type: Schema.Types.ObjectId,
    ref: "TestCase"
  }
});

module.exports = mongoose.model('library', LibrarySchema);
