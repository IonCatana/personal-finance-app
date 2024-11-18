const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: {
    type: String,
    enum: [
      "Entertainment",
      "Bills",
      "Groceries",
      "Dining Out",
      "Transportation",
      "Personal Care",
      "Education",
      "Lifestyle",
      "Shopping",
      "General",
    ],
    required: true,
  },
  maximum: { type: Number, required: true }, // limite massimo del budget
  spentAmount: { type: Number, default: 0 }, // spesa corrente nella categoria
  theme: { type: String }, // colore tematico
});

module.exports = mongoose.model("Budget", budgetSchema);
