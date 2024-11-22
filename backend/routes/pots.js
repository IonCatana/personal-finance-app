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

// Aggiungi un nuovo pot
router.post("/", async (req, res) => {
  try {
    const { name, target, theme } = req.body;

    const newPot = await Pot.create({
      userId: req.user.id,
      name,
      target,
      theme,
    });

    res.status(201).json(newPot);
  } catch (error) {
    res.status(500).json({ error: "Errore nella creazione del pot" });
  }
});

module.exports = router;
