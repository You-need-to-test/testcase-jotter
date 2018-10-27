const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  project_name: {
    type: String,
    required: true
  },
  project_id: {
    type: String,
    required: true
  },
  libraries: [
    {
      type: Schema.Types.ObjectId,
      ref: "libraries"
    }
  ]
});

module.exports = mongoose.model("projects", ProjectSchema);
