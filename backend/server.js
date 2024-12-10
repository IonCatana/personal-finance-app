// backend/server.js
require("module-alias/register");
require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import delle rotte e del middleware
const authMiddleware = require("@middleware/authMiddleware");
const authSignUp = require("@routes/authSignUp");
const authSignIn = require("@routes/authSignIn");
const potRoutes = require("@routes/pots");
const budgetRoutes = require("@routes/budget");
const transactionRoutes = require("@routes/transactions");

const corsOptions = {
  // TODO configurare l'origine per il deploy in produzione (es. dominio del frontend)
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Aggiungi i metodi permessi
};

const app = express();

// Middleware globali
app.use(cors(corsOptions));
app.use(express.json());

// Connessione a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(`MongoDB connesso all'URI: ${process.env.MONGO_URI}`))
  .catch((err) => console.error("Errore di connessione a MongoDB:", err));

// Rotte pubbliche (SignUp e SignIn)
app.use("/api/auth/signup", authSignUp);
app.use("/api/auth/signin", authSignIn);

// Rotte protette (gestione dei pots)
app.use("/api/pots", authMiddleware, potRoutes);
app.use("/api/budgets", authMiddleware, budgetRoutes);
app.use("/api/transactions", authMiddleware, transactionRoutes);

// Server il frontend
app.use(express.static(path.join(__dirname, "../FrontEnd/build")));

// Server qualsiasi altra rotta con l'app React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd/build", "index.html"));
});

// Porta di ascolto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV}`);
});
