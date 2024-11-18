// backend/routes/authSignUp.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("@models/User");

const router = express.Router();

// Rotta di registrazione
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verifica se l'utente esiste già
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "L'email è già registrata" });
    }

    // Crittografia della password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creazione del nuovo utente
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Genera il token JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Risposta con i dati dell'utente e il token
    res.status(201).json({
      message: "Utente creato con successo",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: "Errore nella creazione dell’utente" });
  }
});

module.exports = router;
