const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("@models/User");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Request received:", req.body); // Log per il debug

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Successfully logged in",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Authentication error" });
  }
});

module.exports = router;
