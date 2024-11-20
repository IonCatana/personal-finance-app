import React from "react";
import { Box } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import SectionHeaderContent from "@components/headers/SectionHeaderContent";
import PotsCard from "@components/pots/PotsCard";
import { potsData } from "@components/pots/apiPots";

const PotsContent = ({ handleAddMoney, handleWithdraw }) => {
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
          const percentage = (pot.total / pot.target) * 100;

          return (
            <PotsCard
              key={index}
              name={pot.name}
              total={pot.total}
              target={pot.target}
              percentage={parseFloat(percentage)}
              color={pot.theme}
              onAddMoney={() => handleAddMoney(pot.name)}
              onWithdraw={() => handleWithdraw(pot.name)}
            />
          );
        })}
      </Box>
    </>
  );
};

export default PotsContent;
