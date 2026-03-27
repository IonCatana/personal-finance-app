const express = require("express");
const Pot = require("@models/Pot");
const {
  getBalanceSummary,
  buildBalanceResponse,
  roundCurrency,
  getNumber,
  createValidationError,
} = require("../utils/balanceSummary");

const router = express.Router();

const formatCurrency = (value) => roundCurrency(value).toFixed(2);

const validateTarget = (target) => {
  const normalizedTarget = Number(target);

  if (!Number.isFinite(normalizedTarget) || normalizedTarget <= 0) {
    throw createValidationError(
      "Il target del pot deve essere un importo maggiore di 0."
    );
  }

  return roundCurrency(normalizedTarget);
};

const validateTotal = (total) => {
  const normalizedTotal = Number(total ?? 0);

  if (!Number.isFinite(normalizedTotal) || normalizedTotal < 0) {
    throw createValidationError(
      "L'importo salvato nel pot deve essere uguale o maggiore di 0."
    );
  }

  return roundCurrency(normalizedTotal);
};

const buildPotMutationResponse = async ({ pot, userId, deletedPotId, message }) => {
  const balanceSummary = await getBalanceSummary(userId);

  return {
    ...(pot ? { pot } : {}),
    ...(deletedPotId ? { deletedPotId } : {}),
    ...(message ? { message } : {}),
    balanceSummary: balanceSummary.balance
      ? buildBalanceResponse(balanceSummary)
      : null,
  };
};

// Recupera tutti i pots dell'utente autenticato
router.get("/", async (req, res) => {
  try {
    const shouldIncludeBalanceSummary =
      req.query.includeBalanceSummary === true ||
      String(req.query.includeBalanceSummary).toLowerCase() === "true";
    const pots = await Pot.find({ userId: req.user.id });

    if (!shouldIncludeBalanceSummary) {
      return res.status(200).json(pots);
    }

    const balanceSummary = await getBalanceSummary(req.user.id);

    return res.status(200).json({
      pots,
      balanceSummary: balanceSummary.balance
        ? buildBalanceResponse(balanceSummary)
        : null,
    });
  } catch (error) {
    res.status(500).json({ error: "Errore nel recupero dei pots" });
  }
});

// Recupera un singolo pot per ID
router.get("/:id", async (req, res) => {
  try {
    const pot = await Pot.findOne({ _id: req.params.id, userId: req.user.id });
    if (!pot) {
      return res.status(404).json({ error: "Pot non trovato" });
    }
    res.status(200).json(pot);
  } catch (error) {
    res.status(500).json({ error: "Errore nel recupero del pot" });
  }
});

// Aggiungi un nuovo pot
router.post("/", async (req, res) => {
  try {
    const { name, target, total, color } = req.body;
    const normalizedTarget = validateTarget(target);
    const normalizedTotal = validateTotal(total);
    const balanceSummary = await getBalanceSummary(req.user.id);

    if (!balanceSummary.balance) {
      return res
        .status(404)
        .json({ error: "Configura prima il current balance." });
    }

    if (normalizedTotal > normalizedTarget) {
      throw createValidationError(
        "L'importo salvato non puo superare il target del pot."
      );
    }

    if (normalizedTotal > balanceSummary.availableToAllocate) {
      throw createValidationError(
        `Puoi spostare al massimo $${formatCurrency(
          Math.max(balanceSummary.availableToAllocate, 0)
        )} nel pot.`
      );
    }

    const newPot = await Pot.create({
      userId: req.user.id,
      name,
      target: normalizedTarget,
      total: normalizedTotal,
      color,
    });

    res.status(201).json(
      await buildPotMutationResponse({
        pot: newPot,
        userId: req.user.id,
      })
    );
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    res.status(500).json({ error: "Errore nella creazione del pot" });
  }
});

// Modifica un pot esistente
router.put("/:id", async (req, res) => {
  try {
    const { name, target, total, color } = req.body;
    const existingPot = await Pot.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!existingPot) {
      return res.status(404).json({ error: "Pot non trovato" });
    }

    const normalizedTarget = validateTarget(target ?? existingPot.target);
    const normalizedTotal = validateTotal(total ?? existingPot.total);
    const balanceSummary = await getBalanceSummary(req.user.id);
    const currentTotal = getNumber(existingPot.total);
    const increaseAmount = roundCurrency(normalizedTotal - currentTotal);
    const availableForIncrease = balanceSummary.availableToAllocate;
    const maxAllowedForThisPot = roundCurrency(
      currentTotal + availableForIncrease
    );

    if (!balanceSummary.balance) {
      return res
        .status(404)
        .json({ error: "Configura prima il current balance." });
    }

    if (normalizedTotal > normalizedTarget) {
      throw createValidationError(
        "L'importo salvato non puo superare il target del pot."
      );
    }

    if (increaseAmount > availableForIncrease) {
      throw createValidationError(
        `Questo pot non puo contenere piu di $${formatCurrency(
          Math.max(maxAllowedForThisPot, 0)
        )} in base al current balance disponibile.`
      );
    }

    const updatedPot = await Pot.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        name,
        target: normalizedTarget,
        total: normalizedTotal,
        color,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json(
      await buildPotMutationResponse({
        pot: updatedPot,
        userId: req.user.id,
      })
    );
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    res.status(500).json({ error: "Errore nell'aggiornamento del pot" });
  }
});

// Elimina un pot
router.delete("/:id", async (req, res) => {
  try {
    const deletedPot = await Pot.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deletedPot) {
      return res.status(404).json({ error: "Pot non trovato" });
    }

    res.status(200).json(
      await buildPotMutationResponse({
        userId: req.user.id,
        deletedPotId: req.params.id,
        message: "Pot eliminato con successo",
      })
    );
  } catch (error) {
    res.status(500).json({ error: "Errore nella cancellazione del pot" });
  }
});

module.exports = router;
