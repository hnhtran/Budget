// import dependencies
const mongoose = require("./connection");
const { Schema, model } = mongoose;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}
);

const user = model("user", userSchema);
module.exports = user;