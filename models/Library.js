const mongoose = require('mongoose');
const {Schema} = mongoose;

const LibrarySchema = new Schema({
    library_name: {
        type: String,
        required: true
    },
    suite: [
        {
            type: Schema.Types.ObjectId,
            ref: "Suite"
        }
    ]
});

module.exports = mongoose.model('libraries', LibrarySchema);
