// import dependencies
const mongoose = require("./connection");
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
  }
});

const bankAcc = model("bankAcc", bankAccSchema);
module.exports = bankAcc;
