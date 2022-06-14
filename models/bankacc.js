// import dependencies
const mongoose = require("./connection");
const user = require("./user");
const { Schema, model } = mongoose;
const bankAccSchema = new Schema({
  transDate: {
    type: Date,
    required: true,
  },
  transName:{
    type: String,
    required: true,
  },
  transAmount: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    ref: "user",
  }
});

const bankAcc = model("bankAcc", bankAccSchema);
module.exports = bankAcc;
