import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

/**
 * SectionHeaderContent
 * -------------------------------
 * Questo componente rappresenta un'intestazione di sezione riutilizzabile
 * che include un titolo e un pulsante opzionale.
 *
 * Funzionalità:
 * - Mostra un titolo principale (obbligatorio).
 * - Visualizza un pulsante opzionale con un'azione personalizzabile.
 * - Consente di passare un componente personalizzato per il pulsante.
 *
 * Props:
 * - title (string, obbligatoria): Testo del titolo visualizzato nella sezione.
 * - buttonLabel (string, opzionale): Testo visualizzato nel pulsante.
 * - onButtonClick (function, opzionale): Funzione eseguita al clic sul pulsante.
 * - buttonComponent (elementType, opzionale): Componente personalizzato per il pulsante.
 *
 * Uso:
 * - Ideale per sezioni con un'intestazione che richiedono un titolo e, opzionalmente, un'azione.
 *
 * Esempio:
 * <SectionHeaderContent
 *   title="Dashboard"
 *   buttonLabel="Add New"
 *   onButtonClick={() => console.log("Azione eseguita")}
 *   buttonComponent={ButtonPrimary}
 * />
 */
const SectionHeaderContent = ({
  title,
  buttonLabel,
  onButtonClick,
  buttonComponent: ButtonComponent,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: pxToRem(56),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: pxToRem(32),
      }}>
      {/* Titolo della sezione */}
      <Typography
        sx={{
          typography: "textPreset1",
          color: theme.palette.grey[900],
        }}>
        {title}
      </Typography>

      {/* Pulsante opzionale */}
      {buttonLabel && ButtonComponent && (
        <Box>
          <ButtonComponent onClick={onButtonClick}>
            {buttonLabel}
          </ButtonComponent>
        </Box>
      )}
    </Box>
  );
};

SectionHeaderContent.propTypes = {
  title: PropTypes.string.isRequired, // Titolo della sezione
  buttonLabel: PropTypes.string, // Testo del pulsante opzionale
  onButtonClick: PropTypes.func, // Funzione chiamata al clic del pulsante
  buttonComponent: PropTypes.elementType, // Componente personalizzato per il pulsante
};

export default SectionHeaderContent;
