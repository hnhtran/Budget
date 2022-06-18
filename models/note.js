// import dependencies
const mongoose = require("./connection");
const user = require("./user");
const { Schema, model } = mongoose;

const noteSchema = new Schema(
  {
    noteDate: Date,
    note: String,
    bankId: String,
    user: {
      type: String,
      ref: "user",
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const note = model("note", noteSchema);
module.exports = note;
