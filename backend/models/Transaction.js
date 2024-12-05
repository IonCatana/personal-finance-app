const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  avatar: { type: String, required: true },
  name: { type: String, required: true },
  category: {
    type: String,
    enum: [
      "All Transactions",
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
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  recurring: { type: Boolean, default: false },
});

module.exports = mongoose.model("Transaction", transactionSchema);
