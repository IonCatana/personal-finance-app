require("module-alias/register");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("@models/User");
const Transaction = require("@models/Transaction");
const Budget = require("@models/Budget");
const Pot = require("@models/Pot");
const RecurringBill = require("@models/RecurringBill");
const Balance = require("@models/Balance");

const data = require("./data.json");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connesso per il popolamento"))
  .catch((err) => console.error("Errore di connessione a MongoDB:", err));

const seedDatabase = async () => {
  try {
    // Pulisci le collezioni prima di inserire nuovi dati
    await User.deleteMany({});
    await Transaction.deleteMany({});
    await Budget.deleteMany({});
    await Pot.deleteMany({});
    await RecurringBill.deleteMany({});
    await Balance.deleteMany({});

    // Esempio di inserimento dati utente di default
    const user = await User.create({
      username: "Ion Catana",
      email: "catana.ion17@yahoo.it",
      password: "1234",
    });

    // Inserimento dei dati di bilancio
    await Balance.create({
      userId: user._id,
      current: data.balance.current,
      income: data.balance.income,
      expenses: data.balance.expenses,
    });

    // Inserimento delle transazioni
    const transactions = data.transactions.map((transaction) => ({
      ...transaction,
      userId: user._id,
    }));
    await Transaction.insertMany(transactions);

    // Inserimento dei budget
    const budgets = data.budgets.map((budget) => ({
      ...budget,
      userId: user._id,
    }));
    await Budget.insertMany(budgets);

    // Inserimento dei pots (fondi di risparmio)
    const pots = data.pots.map((pot) => ({
      ...pot,
      userId: user._id,
    }));
    await Pot.insertMany(pots);

    console.log("Dati popolati con successo");
  } catch (err) {
    console.error("Errore durante il popolamento del database:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
