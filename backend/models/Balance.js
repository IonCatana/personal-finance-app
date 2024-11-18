const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  current: { type: Number, required: true }, // saldo attuale
  income: { type: Number, required: true }, // entrate mensili
  expenses: { type: Number, required: true }, // spese mensili
  
});

module.exports = mongoose.model("Balance", balanceSchema);
