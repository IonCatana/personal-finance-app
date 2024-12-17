const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("@models/User");
const authMiddleware = require("@middleWare/authMiddleware");

const router = express.Router();

/**
 * GET /api/user/info
 * Recupera le informazioni dell'utente autenticato
 */
router.get("/info", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error("Error fetching user info:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
