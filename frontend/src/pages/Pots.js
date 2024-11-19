import React from "react";
import { Box } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import SectionHeaderContent from "@components/headers/SectionHeaderContent";
import PotsCard from "@components/pots/PotsCard";

// TODO da ottimizare il codice ancora di piu
const PotsContent = () => {
  // Dati delle card
  const potsData = [
    {
      title: "Savings",
      totalSaved: 159.0,
      target: 2000,
      color: "#277C78",
    },
    {
      title: "Concert Ticket",
      totalSaved: 110,
      target: 150,
      color: "#626070",
    },
    {
      title: "Gift",
      totalSaved: 40,
      target: 60,
      color: "#82C9D7",
    },
    {
      title: "New Laptop",
      totalSaved: 10,
      target: 1000,
      color: "#F2CDAC",
    },
    {
      title: "Holiday",
      totalSaved: 531,
      target: 1440,
      color: "#826CB0",
    },
  ];

  // Handlers per le azioni dei pulsanti
  const handleAddMoney = (title) => {
    console.log(`Aggiungi denaro a ${title}`);
  };

  const handleWithdraw = (title) => {
    console.log(`Prelievo da ${title}`);
  };

  return (
    <>
      <SectionHeaderContent
        title="Pots"
        buttonLabel="+ Add New Pot"
        onButtonClick={() => console.log("Add New Pot clicked!")}
        buttonComponent={ButtonPrimary}
      />
      <Box
        className="pots-content"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "1fr 1fr" },
          gap: pxToRem(24),
        }}>
        {potsData.map((pot, index) => {
          // Calcolo dinamico della percentuale
          const percentage = (pot.totalSaved / pot.target) * 100;

          return (
            <PotsCard
              key={index}
              title={pot.title}
              totalSaved={pot.totalSaved}
              target={pot.target}
              percentage={parseFloat(percentage)}
              color={pot.color}
              onAddMoney={() => handleAddMoney(pot.title)}
              onWithdraw={() => handleWithdraw(pot.title)}
            />
          );
        })}
      </Box>
    </>
  );
};

export default PotsContent;
