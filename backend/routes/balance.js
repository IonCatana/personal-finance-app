const express = require("express");
const Balance = require("@models/Balance");
const authMiddleware = require("@middleWare/authMiddleware");
const {
  getBalanceSummary,
  buildBalanceResponse,
} = require("../utils/balanceSummary");
const router = express.Router();

// Protegge tutte le rotte con il middleware authMiddleware
router.use(authMiddleware);

// Recupera il bilancio dell'utente autenticato
router.get("/", async (req, res) => {
  try {
    const summary = await getBalanceSummary(req.user.id);

    if (!summary.balance) {
      return res.status(404).json({ error: "Balance not found" });
    }

    res.status(200).json(buildBalanceResponse(summary));
  } catch (error) {
    res.status(500).json({ error: "Error retrieving balance" });
  }
});

// Crea un nuovo bilancio per l'utente
router.post("/", async (req, res) => {
  try {
    const { current, income, expenses } = req.body;
    const normalizedCurrent = Number(current);
    const normalizedIncome = Number(income);
    const normalizedExpenses = Number(expenses);

    if (
      !Number.isFinite(normalizedCurrent) ||
      !Number.isFinite(normalizedIncome) ||
      !Number.isFinite(normalizedExpenses)
    ) {
      return res.status(400).json({ error: "Invalid balance payload" });
    }

    const currentSummary = await getBalanceSummary(req.user.id);

    if (currentSummary.balance) {
      return res
        .status(409)
        .json({ error: "Balance already exists for this user" });
    }

    if (normalizedCurrent < currentSummary.totalAllocated) {
      return res.status(400).json({
        error:
          "Current balance cannot be lower than the amount already allocated to budgets and pots.",
      });
    }

    const newBalance = await Balance.create({
      userId: req.user.id,
      current: normalizedCurrent,
      income: normalizedIncome,
      expenses: normalizedExpenses,
    });

    const createdSummary = await getBalanceSummary(req.user.id);
    res.status(201).json(
      buildBalanceResponse({ ...createdSummary, balance: newBalance })
    );
  } catch (error) {
    res.status(500).json({ error: "Error creating balance" });
  }
});

// Aggiorna il bilancio dell'utente
router.put("/", async (req, res) => {
  try {
    const { current, income, expenses } = req.body;
    const normalizedCurrent = Number(current);
    const normalizedIncome = Number(income);
    const normalizedExpenses = Number(expenses);

    if (
      !Number.isFinite(normalizedCurrent) ||
      !Number.isFinite(normalizedIncome) ||
      !Number.isFinite(normalizedExpenses)
    ) {
      return res.status(400).json({ error: "Invalid balance payload" });
    }

    const currentSummary = await getBalanceSummary(req.user.id);

    if (normalizedCurrent < currentSummary.totalAllocated) {
      return res.status(400).json({
        error:
          "Current balance cannot be lower than the amount already allocated to budgets and pots.",
      });
    }

    const updatedBalance = await Balance.findOneAndUpdate(
      { userId: req.user.id },
      {
        userId: req.user.id,
        current: normalizedCurrent,
        income: normalizedIncome,
        expenses: normalizedExpenses,
      },
      { new: true, upsert: true, runValidators: true }
    );

    const updatedSummary = await getBalanceSummary(req.user.id);
    res.status(200).json(
      buildBalanceResponse({ ...updatedSummary, balance: updatedBalance })
    );
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
