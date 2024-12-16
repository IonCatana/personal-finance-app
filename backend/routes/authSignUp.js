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
      return res.status(400).json({ error: "All fields are required" });
    }

    // Controlla se l'utente esiste già
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
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
      message: "User successfully created. You can now log in.",
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Error in creating the user" });
  }
});

module.exports = router;
