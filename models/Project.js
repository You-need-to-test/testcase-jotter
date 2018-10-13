const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  project_name: {
    type: String,
    required: true
  },
  library: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

module.exports = mongoose.model('project', ProjectSchema);
