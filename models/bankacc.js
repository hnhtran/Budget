// import dependencies
const mongoose = require("./connection");
const { Schema, model } = mongoose;
const bankAccSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  transactions: [
    {transactionId: {
        type: Number,
        required: true
    }},
    {date: {
        type: Date,
        required: true
    }},
    {
      source: {
        type: String,
        required: true,
      },
    },
    {
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  balance: {
    type: Number,
    required: true,
  },
});

const bankAcc = model("bankAcc", bankAccSchema);
module.exports = bankAcc;
