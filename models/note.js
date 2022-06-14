// import dependencies
const mongoose = require("./connection");
const { Schema, model } = mongoose;
const noteSchema = new Schema({
    transTitle: String,
    transDate: Date,
    noteDate: Date,
    note: String,
});

const note = model("note", noteSchema);
module.exports = note;
