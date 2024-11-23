import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import SectionHeaderContent from "@components/headers/SectionHeaderContent";
import PotsCard from "@components/pots/PotsCard";
import { getPots, createPot } from "@components/pots/apiPots";

const PotsContent = ({ token }) => {
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
      setPots((prevPots) => [...prevPots, newPot]); // Aggiorna lo stato dei pots
    } catch (error) {
      console.error("Errore nella creazione del pot:", error);
    }
  };

  // Aggiorna i pots dopo un'operazione di edit o delete
  const handleUpdatePot = (updatedPot) => {
    setPots((prevPots) =>
      prevPots.map((pot) => (pot._id === updatedPot._id ? updatedPot : pot))
    );
  };

  const handleDeletePot = (deletedPotId) => {
    setPots((prevPots) => prevPots.filter((pot) => pot._id !== deletedPotId));
  };

  if (loading) {
    return <div>Caricamento in corso...</div>; // Placeholder mentre i dati vengono caricati
  }

  return (
    <>
      <SectionHeaderContent
        title="Pots"
        buttonLabel="+ Add New Pot"
        onButtonClick={() => console.log("Add New Pot clicked!")}
        buttonComponent={ButtonPrimary}
        onAddPot={handleAddPot} // Passa la funzione al figlio
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
              onUpdatePot={handleUpdatePot} // Funzione di aggiornamento
              onDeletePot={handleDeletePot} // Funzione di eliminazione
            />
          );
        })}
      </Box>
    </>
  );
};

export default PotsContent;
