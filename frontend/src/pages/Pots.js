import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import SectionHeaderContent from "@components/headers/SectionHeaderContent";
import PotsCard from "@components/pots/PotsCard";
import { getPots } from "@components/pots/apiPots";

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
      />

      <Box
        className="pots-content"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "1fr 1fr" },
          gap: pxToRem(24),
        }}>
        {pots.map((pot, index) => {
          const percentage = (pot.total / pot.target) * 100;

          return (
            <PotsCard
              key={pot._id}
              name={pot.name}
              total={pot.total}
              target={pot.target}
              percentage={parseFloat(percentage)}
              color={pot.theme}
              token={token}
              onAddMoney={() => console.log(`Add money to ${pot.name}`)}
              onWithdraw={() => console.log(`Withdraw money from ${pot.name}`)}
            />
          );
        })}
      </Box>
    </>
  );
};

export default PotsContent;
