const mongoose = require('mongoose');

/** Creating schema for user */
const userSchema = mongoose.Schema({
     "name":{
        type: String,
        required: [true, 'Please provide a name.']
     },
     "email":{
        type: String,
        unique: true,
        required: [true, 'Please provide a email.'],
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'], // Optional: email format validation
     },
     "password":{
        type: String,
        required: [true, 'Please provide a password.']
     },
     "isAdmin":{
        type: Boolean,
        default: false
     },
},{ timestamps: true });

module.exports = mongoose.model("users",userSchema);