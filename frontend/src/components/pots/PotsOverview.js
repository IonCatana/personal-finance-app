import React from "react";
import { Box, Typography } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import PotsInfoCard from "@components/pots/PotsInfoCard";
import SectionHeaderCard from "@components/card/SectionHeaderCard";
import { ReactComponent as PotIcon } from "@assets/images/icon-pot.svg";
import { useMenu } from "@context/MenuContext";
import { potsData } from "@components/pots/apiPots";

/**
 * PotsOverview
 * -------------------------------
 * Questo componente rappresenta una panoramica dei "pots" (fondi o categorie di risparmio),
 * con informazioni visive come il totale risparmiato e dettagli sui singoli pots.
 *
 * Funzionalità:
 * - Mostra il totale risparmiato in un componente card separato.
 * - Visualizza un elenco di pots con nome, valore e colore.
 * - Include un'intestazione con un pulsante per navigare a una sezione dettagliata.
 *
 * Props:
 * - Nessuna props diretta, i dati sono definiti localmente per ora.
 *
 * Stato:
 * - Non utilizza stato locale, ma fa uso del `MenuContext` per la navigazione.
 *
 * Funzionalità Futuro:
 * - `potsData` è attualmente un array statico. Può essere collegato a un backend
 *   per caricare dati dinamici.
 *
 * Uso:
 * - Ideale per dashboard o sezioni che richiedono una panoramica rapida sui risparmi.
 *
 * Esempio:
 * <PotsOverview />
 */
const PotsOverview = () => {
  const theme = useTheme();
  const { setActiveMenu } = useMenu();

  // Calcolo dinamico del totale risparmiato
  const totalSaved = potsData.reduce((acc, pot) => acc + pot.total, 0);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.otherColors.white,
        borderRadius: pxToRem(12),
        padding: pxToRem(24),
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
          {potsData.slice(0, 4).map((pot, index) => (
            <PotsInfoCard
              key={index}
              name={pot.name}
              total={`$${pot.total}`}
              color={pot.theme}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PotsOverview;
