// backend/routes/authSignIn.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("@models/User");

const router = express.Router();

// Rotta di accesso
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Trova l'utente tramite email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Credenziali non valide" });
    }

    // Confronta la password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Credenziali non valide" });
    }

    // Genera il token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Il token scade in 1 giorno
    });

    // Rispondi con i dati dell'utente e il token
    res.status(200).json({
      message: "Accesso effettuato con successo",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: "Errore nell’autenticazione" });
  }
});

module.exports = router;
