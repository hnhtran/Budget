// import dependencies
const mongoose = require("./connection");
const bankAcc = require("./bankacc");
const user = require("./user");
const { Schema, model } = mongoose;
const noteSchema = new Schema(
  {
    // transId: String,
    // transDate: Date,
    // transName: String,
    // transAmount: Number,
    noteDate: Date,
    note: String,
    user: {
      type: String,
      ref: "user",
      required: true,
    },
    bankAcc: {
      type: Object,
      ref: "bankAcc",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const note = model("note", noteSchema);
module.exports = note;
