const mongoose = require("mongoose");

const potSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true }, // nome del pot (es. "Savings")
  target: { type: Number, required: true }, // obiettivo di risparmio
  total: { type: Number, default: 0 }, // somma attuale nel pot
  theme: { type: String }, // colore tematico
});

module.exports = mongoose.model("Pot", potSchema);
