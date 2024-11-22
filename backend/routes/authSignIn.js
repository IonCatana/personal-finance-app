const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("@models/User");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Richiesta ricevuta:", req.body); // Log per il debug

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email e password sono obbligatori" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Credenziali non valide" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Credenziali non valide" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

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
    console.error("Errore durante il login:", err);
    res.status(500).json({ error: "Errore nell’autenticazione" });
  }
});

module.exports = router;
