// import dependencies
const mongoose = require("./connection");
const { Schema, model } = mongoose;
const noteSchema = new Schema(
  {
    noteDate: Date,
    note: String,
    // bankAcc: {
    //   type: Object,
    //   ref: "bankAcc",
    //   required: true,
    // }
  },
  {
    timestamps: true,
  }
);

const note = model("note", noteSchema);
module.exports = note;
