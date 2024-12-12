// backend/server.js
require("module-alias/register");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import delle rotte e del middleware
const authMiddleware = require("@middleWare/authMiddleware");
const authSignUp = require("@routes/authSignUp");
const authSignIn = require("@routes/authSignIn");
const potRoutes = require("@routes/pots");
const budgetRoutes = require("@routes/budget");
const transactionRoutes = require("@routes/transactions");

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:3000", // Sviluppo locale
      "https://ioncatana.github.io", // Produzione
    ];

    // Consentire richieste senza origine (per strumenti come Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origin non consentita dalla policy CORS."));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

const app = express();

// Middleware globali
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Gestisce le richieste preflight
app.use(express.json());

// Connessione a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(`MongoDB connesso all'URI: ${process.env.MONGO_URI}`))
  .catch((err) => {
    console.error("Errore di connessione a MongoDB:", err);
    console.error("Assicurati che il server MongoDB sia in esecuzione e che l'URI sia corretto.");
    process.exit(1); // Termina il processo in caso di errore di connessione
  });

// Rotte pubbliche (SignUp e SignIn)
app.use("/api/auth/signup", authSignUp);
app.use("/api/auth/signin", authSignIn);

// Rotte protette (gestione dei pots)
app.use("/api/pots", authMiddleware, potRoutes);
app.use("/api/budgets", authMiddleware, budgetRoutes);
app.use("/api/transactions", authMiddleware, transactionRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"))
  );
}

// Porta di ascolto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV}`);
});
