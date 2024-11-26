import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import PotsInfoCard from "@components/pots/PotsInfoCard";
import SectionHeaderCard from "@components/card/SectionHeaderCard";
import { ReactComponent as PotIcon } from "@assets/images/icon-pot.svg";
import { useMenu } from "@context/MenuContext";
import { getPots } from "@components/pots/apiPots";
import { useToken } from "@context/TokenContext";

const PotsOverview = () => {
  const theme = useTheme();
  const { setActiveMenu } = useMenu();
  const [pots, setPots] = useState([]);
  const { token } = useToken();
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
    return <Typography>Loading...</Typography>;
  }

  // Calcolo dinamico del totale risparmiato
  const totalSaved = pots.reduce((acc, pot) => acc + pot.total, 0);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.otherColors.white,
        borderRadius: pxToRem(12),
        padding: {
          xs: `${pxToRem(24)} ${pxToRem(20)}`,
          sm: pxToRem(32),
          md: pxToRem(32),
        },
      }}>
      {/* Intestazione della sezione */}
      <SectionHeaderCard
        title="Pots"
        buttonLabel="See Details"
        onButtonClick={() => setActiveMenu(4)}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row", md: "row" },
          gap: pxToRem(20),
        }}>
        {/* Totale Risparmiato */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: theme.palette.beige[100],
            padding: pxToRem(16),
            gap: pxToRem(16),
            maxWidth: {
              xs: "100%",
              sm: pxToRem(247),
              md: pxToRem(247),
            },
            width: "100%",
            borderRadius: pxToRem(12),
          }}>
          <Box
            sx={{
              width: pxToRem(40),
              height: pxToRem(40),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Box>
              <PotIcon />
            </Box>
          </Box>
          <Box>
            <Typography
              sx={{
                typography: "textPreset4",
                color: theme.palette.grey[500],
                marginBottom: pxToRem(11),
              }}>
              Total Saved
            </Typography>
            <Typography
              sx={{
                typography: "textPreset1",
                color: theme.palette.grey[900],
              }}>
              ${totalSaved}
            </Typography>
          </Box>
        </Box>

        {/* Lista dei pots */}
        <Box
          sx={{
            display: "grid",
            width: "100%",
            gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr" },
            gap: pxToRem(16),
          }}>
          {pots.slice(0, 4).map((pot, index) => (
            <PotsInfoCard
              key={index}
              name={pot.name}
              total={`$${pot.total}`}
              color={pot.color}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PotsOverview;
