const mongoose = require("mongoose");

const recurringBillSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true }, // nome del servizio o fornitore
  amount: { type: Number, required: true }, // importo della bolletta
  date: { type: Date, required: true }, // data di pagamento ricorrente
  status: { type: String, enum: ["paid", "unpaid"], default: "unpaid" }, // stato del pagamento
});

module.exports = mongoose.model("RecurringBill", recurringBillSchema);
