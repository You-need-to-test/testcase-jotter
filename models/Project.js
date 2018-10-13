const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProjectSchema = new Schema({
    project_name: {
        type: String,
        required: true
    },
    library: [
        {
            type: Schema.Types.ObjectId,
            ref: "Library"
        },
    ]
});

module.exports = mongoose.model('projects', ProjectSchema);
