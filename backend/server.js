// backend/server.js
require("module-alias/register");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configura la connessione al database in base all'ambiente
const MONGO_URI = process.env.MONGO_URI;

// Connessione a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(`MongoDB connesso all'URI: ${process.env.MONGO_URI}`))
  .catch((err) => console.error("Errore di connessione a MongoDB:", err));

// Porta
const PORT = process.env.PORT || 5000;

// Import delle rotte
const authSignUp = require("@routes/authSignUp");
const authSignIn = require("@routes/authSignIn");

// Definizione delle route
app.use("/api/auth/signup", authSignUp);
app.use("/api/auth/signin", authSignIn);

// Porta di ascolto
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV}`);
});
