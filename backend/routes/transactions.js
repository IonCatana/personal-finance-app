const express = require("express");
const Transaction = require("@models/Transaction");
const authMiddleware = require("@middleWare/authMiddleware");
const router = express.Router();

// Protegge tutte le rotte con il middleware authMiddleware
router.use(authMiddleware);

// GET: Recuperare tutte le transactions con ricerca, filtri e ordinamento
router.get("/", async (req, res) => {
  const { search, category, sort } = req.query;

  try {
    const userId = req.user.id; // ID dell'utente autenticato

    // Base query
    let query = { userId };

    // Filtro per categoria
    if (category && category !== "All Transactions") {
      query.category = category;
    }

    // Filtro per ricerca
    if (search) {
      query.name = { $regex: search, $options: "i" }; // Case-insensitive
    }

    // Ordinamento
    let sortOption;
    switch (sort) {
      case "latest":
        sortOption = { date: -1 }; // Data decrescente
        break;
      case "oldest":
        sortOption = { date: 1 }; // Data crescente
        break;
      case "AtoZ":
        sortOption = { name: 1 }; // Nome alfabetico crescente
        break;
      case "ZtoA":
        sortOption = { name: -1 }; // Nome alfabetico decrescente
        break;
      case "highest":
        sortOption = { amount: -1 }; // Importo decrescente
        break;
      case "lowest":
        sortOption = { amount: 1 }; // Importo crescente
        break;
      default:
        sortOption = { date: -1 }; // Default: data decrescente
    }

    // Recupera le transactions con i filtri applicati
    const transactions = await Transaction.find(query).sort(sortOption);

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Errore nel recupero delle transactions:", error);
    res.status(500).json({ error: "Errore nel recupero delle transactions." });
  }
});

// POST: Creare una nuova transaction
router.post("/", async (req, res) => {
  const { avatar, name, category, date, amount, recurring } = req.body;

  try {
    const newTransaction = new Transaction({
      userId: req.user.id,
      avatar,
      name,
      category,
      date,
      amount,
      recurring,
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error("Errore nella creazione della transaction:", error);
    res
      .status(500)
      .json({ error: "Errore nella creazione della transaction." });
  }
});

// PUT: Aggiornare una transaction esistente
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { avatar, name, category, date, amount, recurring } = req.body;

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { avatar, name, category, date, amount, recurring },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction non trovata." });
    }

    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error("Errore nell'aggiornamento della transaction:", error);
    res
      .status(500)
      .json({ error: "Errore nell'aggiornamento della transaction." });
  }
});

// DELETE: Eliminare una transaction
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return res.status(404).json({ error: "Transaction non trovata." });
    }

    res.status(200).json({ message: "Transaction eliminata con successo." });
  } catch (error) {
    console.error("Errore nell'eliminazione della transaction:", error);
    res
      .status(500)
      .json({ error: "Errore nell'eliminazione della transaction." });
  }
});

module.exports = router;
