import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

/**
 * StatCard
 * -------------------------------
 * Questo componente rappresenta una card utilizzata per mostrare statistiche
 * o dati aggregati in modo chiaro e visivamente gradevole.
 *
 * Props:
 * - title (string, obbligatoria): Testo che descrive la statistica (es. "Current Balance").
 * - value (string, obbligatoria): Valore principale da visualizzare (es. "$5,000").
 * - color (string, opzionale): Colore del testo per personalizzare il titolo e il valore.
 * - backgroundColor (string, opzionale): Colore dello sfondo della card.
 * - icon (node, opzionale): Icona opzionale da visualizzare accanto al contenuto.
 *
 * Uso:
 * - Ideale per dashboard o sezioni di reportistica.
 * - Può essere utilizzato per mostrare dati come saldo corrente, spese, o entrate.
 *
 * Esempio:
 * <StatCard
 *   title="Current Balance"
 *   value="$5,000"
 *   color="#333"
 *   backgroundColor="#f5f5f5"
 * />
 */
const StatCard = ({ title, value, color, backgroundColor }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: backgroundColor || theme.palette.otherColors.white,
        color: color || theme.palette.grey[900],
        borderRadius: pxToRem(12),
        padding: {
          xs: `${pxToRem(20)} ${pxToRem(20)}`,
          sm: `${pxToRem(24)}`,
          md: `${pxToRem(24)}`,
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: pxToRem(12),
        justifyContent: "center",
        width: "100%",
      }}>
      {/* Titolo della statistica */}
      <Typography
        sx={{
          typography: "textPreset4",
          color: color || theme.palette.grey[500],
        }}>
        {title}
      </Typography>

      {/* Valore della statistica */}
      <Typography
        sx={{
          typography: "textPreset1",
          color: color || theme.palette.grey[900],
        }}>
        {value}
      </Typography>
    </Box>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired, // Titolo della statistica (es. "Current Balance")
  value: PropTypes.string.isRequired, // Valore principale della statistica (es. "$5,000")
  color: PropTypes.string, // Colore del testo (opzionale)
  backgroundColor: PropTypes.string, // Colore dello sfondo (opzionale)
  icon: PropTypes.node, // Icona opzionale da visualizzare accanto al contenuto
};

export default StatCard;
