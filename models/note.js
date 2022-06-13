// import dependencies
const mongoose = require("./connection");
const { Schema, model } = mongoose;
const noteSchema = new Schema({
    title: String,
    note: String,
    transactionId: Number,
});

const note = model("note", noteSchema);
module.exports = note;
