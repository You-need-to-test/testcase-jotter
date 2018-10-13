const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    googleId: {
        type: String
    },
    familyName: {
        type: String
    },
    givenName: {
        type: String
    },
    email: {
        type: String
    }
})

mongoose.model('users', userSchema);