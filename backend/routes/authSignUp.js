// backend/routes/authSignUp.js
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("@models/User");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validazione dei campi
    if (!username || !email || !password) {
      console.log("Campi richiesti:", req.body);
      return res.status(400).json({ error: "Tutti i campi sono obbligatori" });
    }

    // Controlla se l'utente esiste già
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "L'email è già registrata" });
    }

    // Genera un hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuovo utente
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Non generare il token qui

    // Risponde con i dati dell'utente senza il token
    res.status(201).json({
      message: "Utente creato con successo. Ora puoi effettuare il login.",
    });
  } catch (err) {
    console.error("Errore nella registrazione:", err);
    res.status(500).json({ error: "Errore nella creazione dell’utente" });
  }
});

module.exports = router;
