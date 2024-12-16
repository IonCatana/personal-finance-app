import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import ButtonTertiary from "@components/buttons/ButtonTertiary";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

/**
 * SectionHeaderCard
 * -------------------------------
 * Questo componente rappresenta un'intestazione di sezione riutilizzabile,
 * completa di un titolo e, opzionalmente, un pulsante con un'azione.
 *
 * Props:
 * - title (string, obbligatoria): Testo visualizzato come titolo della sezione.
 * - buttonLabel (string, opzionale): Testo visualizzato nel pulsante, se presente.
 * - onButtonClick (function, opzionale): Funzione chiamata al clic del pulsante.
 *
 * Uso:
 * - Ideale per creare intestazioni di sezioni con un layout uniforme.
 * - Può essere utilizzato in qualsiasi sezione che richiede un titolo e un'azione.
 *
 * Esempio:
 * <SectionHeaderCard
 *   title="Pots"
 *   buttonLabel="See Details"
 *   onButtonClick={() => console.log("Pulsante cliccato")}
 * />
 */
const SectionHeaderCard = ({
  title,
  buttonLabel,
  onButtonClick,
  titleTypography,
  sx = {},
}) => {
  const theme = useTheme(); // Permette di accedere ai colori e agli stili definiti nel tema

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: pxToRem(20),
        ...sx,
      }}>
      {/* Titolo della sezione */}
      <Typography
        sx={{
          typography: titleTypography || "textPreset2",
          color: theme.palette.grey[900],
        }}>
        {title}
      </Typography>

      {/* Pulsante opzionale con azione */}
      {buttonLabel && onButtonClick && (
        <ButtonTertiary withIcon onClick={onButtonClick}>
          {buttonLabel}
        </ButtonTertiary>
      )}
    </Box>
  );
};

SectionHeaderCard.propTypes = {
  title: PropTypes.string.isRequired, // Titolo della sezione
  buttonLabel: PropTypes.string, // Testo del pulsante (opzionale)
  onButtonClick: PropTypes.func, // Funzione chiamata al clic del pulsante (opzionale)
  titleTypography: PropTypes.string, // Stile tipografico personalizzabile per il titolo
  sx: PropTypes.object, // Stili personalizzati
};

export default SectionHeaderCard;
