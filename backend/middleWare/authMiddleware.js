const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token non fornito." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // Associa l'ID utente al request
    next();
  } catch (err) {
    res.status(401).json({ error: "Token non valido." });
  }
};

module.exports = authMiddleware;
