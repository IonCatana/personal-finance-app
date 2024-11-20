import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

/**
 * PotsInfoCard
 * -------------------------------
 * Questo componente rappresenta una card compatta progettata per visualizzare
 * informazioni sintetiche, come un'etichetta (name) e un valore principale (total).
 * Include un indicatore colorato opzionale sul lato sinistro.
 *
 * Props:
 * - `name` (string, opzionale): Nome o etichetta del contenuto (es. "Savings").
 * - `total` (string, opzionale): Valore principale da visualizzare (es. "$500").
 * - `color` (string, opzionale): Colore del bordo laterale sinistro, usato come indicatore visivo.
 * - `sx` (object, opzionale): Stili personalizzati aggiuntivi.
 * - `...props` (object): Altri attributi che possono essere passati al componente.
 *
 * Funzionalità:
 * - Mostra un'etichetta sopra il valore principale.
 * - Aggiunge un bordo colorato a sinistra, se il prop `color` è definito.
 * - Supporta stili personalizzati tramite il prop `sx`.
 *
 * Esempio di utilizzo:
 * ```jsx
 * <PotsInfoCard
 *   name="Savings"
 *   total="$500"
 *   color="#F2CDAC"
 *   sx={{ backgroundColor: "#F7F7F7" }}
 * />
 * ```
 *
 * Uso:
 * - Ideale per layout compatti, come dashboard o riepiloghi di dati.
 * - Può essere utilizzato come componente riutilizzabile in elenchi di informazioni sintetiche.
 */
const PotsInfoCard = ({ name, total, color, sx = {}, ...props }) => {
  const theme = useTheme(); // Accesso al tema per colori e stile globale

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
        {/* Nome o etichetta descrittiva */}
        {name && (
          <Typography
            sx={{
              typography: "textPreset5",
              color: theme.palette.grey[500],
              marginBottom: name ? pxToRem(4) : 0,
            }}>
            {name}
          </Typography>
        )}

        {/* Valore principale */}
        {total && (
          <Typography
            sx={{
              typography: "textPreset4Bold",
              color: theme.palette.grey[900],
            }}>
            {total}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

PotsInfoCard.propTypes = {
  name: PropTypes.string, // Nome o etichetta del contenuto (es. "Savings")
  total: PropTypes.string, // Valore principale (es. "$500")
  color: PropTypes.string, // Colore del bordo laterale sinistro (es. "#F2CDAC")
  sx: PropTypes.object, // Oggetto per stili personalizzati opzionali
};

export default PotsInfoCard;
