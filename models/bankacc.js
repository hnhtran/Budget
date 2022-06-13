// import dependencies
const mongoose = require("./connection");
const { Schema, model } = mongoose;
const bankAccSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  transactions: [
    {
      Source: {
        type: String,
        required: true,
      },
    },
    {
      Amount: {
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
