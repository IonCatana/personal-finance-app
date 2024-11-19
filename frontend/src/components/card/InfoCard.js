import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

/**
 * InfoCard
 * -------------------------------
 * Questo componente rappresenta una card semplice e compatta, progettata per
 * visualizzare informazioni sintetiche, con un'etichetta (label) e un valore.
 * Include anche un indicatore di colore opzionale a sinistra.
 *
 * Props:
 * - label (string, opzionale): Etichetta descrittiva del contenuto (es. "Savings").
 * - value (string, opzionale): Valore principale da visualizzare (es. "$500").
 * - color (string, opzionale): Colore del bordo laterale sinistro, usato come indicatore.
 * - sx (object, opzionale): Stili personalizzati aggiuntivi.
 * - ...props (object): Altri attributi opzionali che possono essere passati al componente.
 *
 * Uso:
 * - Ideale per visualizzare informazioni sintetiche in layout compatti.
 * - Può essere utilizzato in dashboard, riepiloghi o elenchi di dati.
 *
 * Esempio:
 * <InfoCard
 *   label="Savings"
 *   value="$500"
 *   color="#4CAF50"
 *   sx={{ marginBottom: "16px" }}
 * />
 */
const InfoCard = ({ label, value, color, sx = {}, ...props }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor:
          props.backgroundColor || theme.palette.otherColors.white,
        padding: `${pxToRem(0)} ${pxToRem(0)} ${pxToRem(0)} ${pxToRem(16)}`,
        width: "100%",
        maxHeight: pxToRem(43),
        borderRadius: pxToRem(8),
        position: "relative",
        "&:after": color
          ? {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 0,
              width: pxToRem(4),
              height: "100%",
              backgroundColor: color,
              borderRadius: `${pxToRem(8)} ${pxToRem(8)} ${pxToRem(
                8
              )} ${pxToRem(8)}`,
            }
          : {},
        ...sx,
      }}
      {...props}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
        {/* Etichetta descrittiva */}
        {label && (
          <Typography
            sx={{
              typography: "textPreset5",
              color: theme.palette.grey[500],
              marginBottom: label ? pxToRem(4) : 0,
            }}>
            {label}
          </Typography>
        )}

        {/* Valore principale */}
        {value && (
          <Typography
            sx={{
              typography: "textPreset4Bold",
              color: theme.palette.grey[900],
            }}>
            {value}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

InfoCard.propTypes = {
  label: PropTypes.string, // Etichetta descrittiva
  value: PropTypes.string, // Valore principale
  color: PropTypes.string, // Colore dell'indicatore laterale
  sx: PropTypes.object, // Stili personalizzati opzionali
};

export default InfoCard;
