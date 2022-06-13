// import dependencies
const mongoose = require("./connection");
const { Schema, model } = mongoose;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bankAccs: Number,
    email: String
});

const user = model("user", userSchema);
module.exports = user;