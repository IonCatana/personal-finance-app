const express = require("express");
const Pot = require("@models/Pot");

const router = express.Router();

// Recupera tutti i pots dell'utente autenticato
router.get("/", async (req, res) => {
  try {
    const pots = await Pot.find({ userId: req.user.id });
    res.status(200).json(pots);
  } catch (error) {
    res.status(500).json({ error: "Errore nel recupero dei pots" });
  }
});

// Recupera un singolo pot per ID
router.get("/:id", async (req, res) => {
  try {
    const pot = await Pot.findOne({ _id: req.params.id, userId: req.user.id });
    if (!pot) {
      return res.status(404).json({ error: "Pot non trovato" });
    }
    res.status(200).json(pot);
  } catch (error) {
    res.status(500).json({ error: "Errore nel recupero del pot" });
  }
});

// Aggiungi un nuovo pot
router.post("/", async (req, res) => {
  try {
    const { name, target, total, theme } = req.body;

    const newPot = await Pot.create({
      userId: req.user.id,
      name,
      target,
      total,
      theme,
    });

    res.status(201).json(newPot);
  } catch (error) {
    res.status(500).json({ error: "Errore nella creazione del pot" });
  }
});

// Modifica un pot esistente
router.put("/:id", async (req, res) => {
  try {
    const { name, target, total, theme } = req.body;

    const updatedPot = await Pot.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { name, target, total, theme },
      { new: true, runValidators: true }
    );

    if (!updatedPot) {
      return res.status(404).json({ error: "Pot non trovato" });
    }

    res.status(200).json(updatedPot);
  } catch (error) {
    res.status(500).json({ error: "Errore nell'aggiornamento del pot" });
  }
});

// Elimina un pot
router.delete("/:id", async (req, res) => {
  try {
    const deletedPot = await Pot.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deletedPot) {
      return res.status(404).json({ error: "Pot non trovato" });
    }

    res.status(200).json({ message: "Pot eliminato con successo" });
  } catch (error) {
    res.status(500).json({ error: "Errore nella cancellazione del pot" });
  }
});

module.exports = router;
