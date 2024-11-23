const mongoose = require("mongoose");

const potSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  target: { type: Number, required: true },
  total: { type: Number, default: 0 },
  color: { type: String, required: true },
});

module.exports = mongoose.model("Pot", potSchema);
