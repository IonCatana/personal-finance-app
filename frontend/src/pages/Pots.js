import React from "react";
import { Box } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import SectionHeaderContent from "@components/headers/SectionHeaderContent";
import PotsCard from "@components/pots/PotsCard";
import { potsData } from "@components/pots/apiPots";

/**
 * PotsContent Component
 * -------------------------------
 * Questo componente rappresenta il contenuto principale della sezione "Pots".
 * È responsabile di:
 * - Mostrare l'intestazione della sezione con un pulsante per aggiungere un nuovo pot.
 * - Visualizzare una griglia di card (`PotsCard`), ognuna delle quali rappresenta un pot.
 *
 * Props:
 * - `handleAddMoney`: Funzione chiamata quando si clicca su "+ Add Money" in una card.
 * - `handleWithdraw`: Funzione chiamata quando si clicca su "Withdraw" in una card.
 *
 * Funzionalità principali:
 * - Mappa i dati dei pots da `potsData` e li passa a ogni card.
 * - Calcola dinamicamente la percentuale di completamento di ogni pot.
 * - Fornisce un layout responsivo utilizzando il sistema di griglie di Material-UI.
 *
 * Esempio di utilizzo:
 * ```jsx
 * <PotsContent
 *   handleAddMoney={(name) => console.log(`Add money to ${name}`)}
 *   handleWithdraw={(name) => console.log(`Withdraw money from ${name}`)}
 * />
 * ```
 */
const PotsContent = ({ handleAddMoney, handleWithdraw }) => {
  return (
    <>
      {/* Intestazione della sezione */}
      <SectionHeaderContent
        title="Pots"
        buttonLabel="+ Add New Pot"
        onButtonClick={() => console.log("Add New Pot clicked!")}
        buttonComponent={ButtonPrimary}
      />

      {/* Contenuto principale: griglia delle card */}
      <Box
        className="pots-content"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "1fr 1fr" },
          gap: pxToRem(24),
        }}>
        {potsData.map((pot, index) => {
          // Calcolo dinamico della percentuale
          const percentage = (pot.total / pot.target) * 100;

          return (
            <PotsCard
              key={index}
              name={pot.name}
              total={pot.total}
              target={pot.target}
              percentage={parseFloat(percentage)}
              color={pot.theme}
              onAddMoney={() => handleAddMoney(pot.name)} // Gestione aggiunta denaro
              onWithdraw={() => handleWithdraw(pot.name)} // Gestione prelievo denaro
            />
          );
        })}
      </Box>
    </>
  );
};

export default PotsContent;
