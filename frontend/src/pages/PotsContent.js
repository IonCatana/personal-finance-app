import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import SectionHeaderContent from "@components/headers/SectionHeaderContent";
import PotsCard from "@components/pots/PotsCard";
import { getPots, createPot } from "@components/pots/apiPots";
import { useTheme } from "@mui/material/styles";

/**
 * **Componente PotsContent**
 *
 * Questo componente è responsabile della gestione e visualizzazione dei "pots" (contenitori finanziari) dell'applicazione.
 *
 * ### Funzionalità principali:
 *
 * 1. **Caricamento dei pots**:
 *    - Recupera i pots dal backend utilizzando la funzione `getPots` e aggiorna lo stato locale con i dati ricevuti.
 *    - Gestisce un indicatore di caricamento (`loading`) per mostrare uno stato visivo durante il recupero dei dati.
 *
 * 2. **Creazione di un nuovo pot**:
 *    - Permette di creare un nuovo pot utilizzando la funzione `createPot` e aggiorna lo stato locale aggiungendo il nuovo elemento.
 *
 * 3. **Aggiornamento dei pots**:
 *    - Consente di aggiornare un pot esistente modificandone i dati tramite `handleUpdatePot`.
 *    - Sostituisce il pot aggiornato nella lista locale dei pots.
 *
 * 4. **Eliminazione dei pots**:
 *    - Rimuove un pot dalla lista locale utilizzando `handleDeletePot`.
 *
 * 5. **Interfaccia utente**:
 *    - Visualizza un header con un pulsante per aggiungere nuovi pots, utilizzando il componente `SectionHeaderContent`.
 *    - Mostra i pots come una griglia di card, con ogni card rappresentata dal componente `PotsCard`.
 *
 * ### Stile e layout:
 * - Utilizza una griglia responsiva tramite Material-UI, con colonne che si adattano alle dimensioni dello schermo.
 * - Gli spazi tra le card sono gestiti tramite `gap` definito con `pxToRem`.
 *
 * ### Props:
 * - **token**: Token di autenticazione necessario per effettuare richieste al backend.
 *
 * ### Stato:
 * - **pots**: Array che contiene l'elenco dei pots attualmente disponibili.
 * - **loading**: Booleano che indica se i dati sono in fase di caricamento.
 *
 * ### Vantaggi:
 * - Centralizza la gestione dei pots in un unico componente.
 * - Supporta operazioni CRUD sui pots (Create, Read, Update, Delete).
 * - Garantisce un'interfaccia reattiva e ben organizzata.
 */

const PotsContent = ({ token }) => {
  const theme = useTheme();
  const [pots, setPots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPots = async () => {
      try {
        const data = await getPots(token);
        setPots(data);
      } catch (error) {
        console.error("Errore nel caricamento dei pots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPots();
  }, [token]);

  const handleAddPot = async (newPotData, token) => {
    try {
      const newPot = await createPot(newPotData, token);
      setPots((prevPots) => [...prevPots, newPot]);
    } catch (error) {
      console.error("Errore nella creazione del pot:", error);
    }
  };

  const handleUpdatePot = (updatedPot) => {
    setPots((prevPots) =>
      prevPots.map((pot) => (pot._id === updatedPot._id ? updatedPot : pot))
    );
  };

  const handleDeletePot = (deletedPotId) => {
    setPots((prevPots) => prevPots.filter((pot) => pot._id !== deletedPotId));
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}>
        <CircularProgress
          style={{
            color: theme.palette.secondaryColors.green,
          }}
        />
      </Box>
    );
  }

  return (
    <>
      <SectionHeaderContent
        title="Pots"
        buttonLabel="+ Add New Pot"
        onButtonClick={() => console.log("Add New Pot clicked!")}
        buttonComponent={ButtonPrimary}
        onAddItem={handleAddPot}
        modalType="add"
        token={token}
      />

      <Box
        className="pots-content"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "1fr 1fr" },
          gap: pxToRem(24),
        }}>
        {pots.map((pot) => {
          const percentage = (pot.total / pot.target) * 100;

          return (
            <PotsCard
              key={pot._id}
              _id={pot._id}
              name={pot.name}
              total={pot.total}
              target={pot.target}
              percentage={parseFloat(percentage)}
              color={pot.color}
              token={token}
              onAddMoney={() => console.log(`Add money to ${pot.name}`)}
              onWithdraw={() => console.log(`Withdraw money from ${pot.name}`)}
              onUpdatePot={handleUpdatePot}
              onDeletePot={handleDeletePot}
            />
          );
        })}
      </Box>
    </>
  );
};

export default PotsContent;
