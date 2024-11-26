const express = require("express");
const Budget = require("@models/Budget");
const router = express.Router();

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
    const newBudget = new Budget({
      userId: req.user.id,
      category,
      maximum,
      spentAmount: 0,
      color,
    });

    const savedBudget = await newBudget.save();
    res.status(201).json(savedBudget);
  } catch (error) {
    console.error("Errore nella creazione del budget:", error);
    res.status(500).json({ error: "Errore nella creazione del budget." });
  }
});

// PUT: Aggiornare un budget esistente
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { maximum, spentAmount, color, category } = req.body;

  try {
    const updatedBudget = await Budget.findByIdAndUpdate(
      id,
      { maximum, spentAmount, color, category },
      { new: true }
    );

    if (!updatedBudget) {
      return res.status(404).json({ error: "Budget non trovato." });
    }

    res.status(200).json(updatedBudget);
  } catch (error) {
    console.error("Errore nell'aggiornamento del budget:", error);
    res.status(500).json({ error: "Errore nell'aggiornamento del budget." });
  }
});

// DELETE: Eliminare un budget
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBudget = await Budget.findByIdAndDelete(id);

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
