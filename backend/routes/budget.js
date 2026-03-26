const express = require("express");
const Budget = require("@models/Budget");
const {
  getBalanceSummary,
  roundCurrency,
  getNumber,
  createValidationError,
} = require("../utils/balanceSummary");
const router = express.Router();

const formatCurrency = (value) => roundCurrency(value).toFixed(2);

const validateBudgetMaximum = (maximum) => {
  const normalizedMaximum = Number(maximum);

  if (!Number.isFinite(normalizedMaximum) || normalizedMaximum <= 0) {
    throw createValidationError(
      "Il budget massimo deve essere un importo maggiore di 0."
    );
  }

  return roundCurrency(normalizedMaximum);
};

// GET: Recuperare tutti i budget per un utente
router.get("/", async (req, res) => {
  try {
    const userId = req.user.id; // ID dell'utente autenticato (deve essere gestito con middleware auth)
    const budgets = await Budget.find({ userId }).sort("category");
    res.status(200).json(budgets);
  } catch (error) {
    console.error("Errore nel recupero dei budget:", error);
    res.status(500).json({ error: "Errore nel recupero dei budget." });
  }
});

// POST: Creare un nuovo budget
router.post("/", async (req, res) => {
  const { category, maximum, color } = req.body;

  try {
    const normalizedMaximum = validateBudgetMaximum(maximum);
    const balanceSummary = await getBalanceSummary(req.user.id);

    if (!balanceSummary.balance) {
      return res
        .status(404)
        .json({ error: "Configura prima il current balance." });
    }

    if (normalizedMaximum > balanceSummary.availableToAllocate) {
      throw createValidationError(
        `Puoi allocare al massimo $${formatCurrency(
          Math.max(balanceSummary.availableToAllocate, 0)
        )} ai budget e pots disponibili.`
      );
    }

    const newBudget = new Budget({
      userId: req.user.id,
      category,
      maximum: normalizedMaximum,
      spentAmount: 0,
      color,
    });

    const savedBudget = await newBudget.save();
    res.status(201).json(savedBudget);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error("Errore nella creazione del budget:", error);
    res.status(500).json({ error: "Errore nella creazione del budget." });
  }
});

// PUT: Aggiornare un budget esistente
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { maximum, spentAmount, color, category } = req.body;

  try {
    const budget = await Budget.findOne({ _id: id, userId: req.user.id });

    if (!budget) {
      return res.status(404).json({ error: "Budget non trovato." });
    }

    const normalizedMaximum = validateBudgetMaximum(maximum);
    const balanceSummary = await getBalanceSummary(req.user.id);
    const currentMaximum = getNumber(budget.maximum);
    const increaseAmount = roundCurrency(normalizedMaximum - currentMaximum);
    const availableForIncrease = balanceSummary.availableToAllocate;
    const maxAllowedForThisBudget = roundCurrency(
      currentMaximum + availableForIncrease
    );

    if (!balanceSummary.balance) {
      return res
        .status(404)
        .json({ error: "Configura prima il current balance." });
    }

    if (increaseAmount > availableForIncrease) {
      throw createValidationError(
        `Questo budget non puo superare $${formatCurrency(
          Math.max(maxAllowedForThisBudget, 0)
        )}.`
      );
    }

    const updatePayload = {
      maximum: normalizedMaximum,
      color,
      category,
    };

    if (typeof spentAmount !== "undefined") {
      updatePayload.spentAmount = spentAmount;
    }

    const updatedBudget = await Budget.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      updatePayload,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedBudget);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error("Errore nell'aggiornamento del budget:", error);
    res.status(500).json({ error: "Errore nell'aggiornamento del budget." });
  }
});

// DELETE: Eliminare un budget
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBudget = await Budget.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deletedBudget) {
      return res.status(404).json({ error: "Budget non trovato." });
    }

    res.status(200).json({ message: "Budget eliminato con successo." });
  } catch (error) {
    console.error("Errore nell'eliminazione del budget:", error);
    res.status(500).json({ error: "Errore nell'eliminazione del budget." });
  }
});

module.exports = router;
