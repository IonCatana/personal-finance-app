const express = require("express");
const Balance = require("@models/Balance");
const authMiddleware = require("@middleWare/authMiddleware");
const router = express.Router();

// Protegge tutte le rotte con il middleware authMiddleware
router.use(authMiddleware);

// Recupera il bilancio dell'utente autenticato
router.get("/", async (req, res) => {
  try {
    const balance = await Balance.findOne({ userId: req.user.id });
    if (!balance) {
      return res.status(404).json({ error: "Balance not found" });
    }
    res.status(200).json(balance);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving balance" });
  }
});

// Crea un nuovo bilancio per l'utente
router.post("/", async (req, res) => {
  try {
    const { current, income, expenses } = req.body;

    const newBalance = await Balance.create({
      userId: req.user.id,
      current,
      income,
      expenses,
    });

    res.status(201).json(newBalance);
  } catch (error) {
    res.status(500).json({ error: "Error creating balance" });
  }
});

// Aggiorna il bilancio dell'utente
router.put("/", async (req, res) => {
  try {
    const { current, income, expenses } = req.body;

    const updatedBalance = await Balance.findOneAndUpdate(
      { userId: req.user.id },
      { current, income, expenses },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json(updatedBalance);
  } catch (error) {
    res.status(500).json({ error: "Error updating balance" });
  }
});

// Elimina il bilancio dell'utente
router.delete("/", async (req, res) => {
  try {
    const deletedBalance = await Balance.findOneAndDelete({
      userId: req.user.id,
    });

    if (!deletedBalance) {
      return res.status(404).json({ error: "Balance not found" });
    }

    res.status(200).json({ message: "Balance deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting balance" });
  }
});

module.exports = router;
