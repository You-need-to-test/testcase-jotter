const mongoose = require("mongoose");
const { Schema } = mongoose;

const LibrarySchema = new Schema({
  library_name: {
    type: String,
    required: true
  },
  project_id: {
    type: String,
    required: true
  }
  // ,
  // suites: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "suites"
  //   }
  // ]
});

module.exports = mongoose.model("libraries", LibrarySchema);
