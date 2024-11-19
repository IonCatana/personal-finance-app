import React from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

/**
 * ButtonPrimary
 * -------------------------------
 * Questo componente rappresenta un pulsante primario, usato per azioni principali
 * all'interno dell'applicazione. È progettato per essere visibile e intuitivo.
 *
 * Props:
 * - children (node, obbligatoria): Contenuto del pulsante (es. "Submit" o icona+testo).
 * - sx (object, opzionale): Stili personalizzati per il pulsante.
 * - ...props (object): Altre proprietà che vengono passate al componente Button di Material-UI.
 *
 * Uso:
 * - Ideale per azioni principali come inviare un modulo, salvare dati, o confermare un'azione.
 * - Supporta personalizzazioni tramite `sx` o altre props.
 *
 * Esempio:
 * <ButtonPrimary onClick={() => console.log("Azione eseguita")}>
 *   Submit
 * </ButtonPrimary>
 */
const ButtonPrimary = ({ children, sx = {}, ...props }) => {
  const theme = useTheme();

  return (
    <Button
      variant="contained"
      sx={{
        typography: "textPreset4Bold",
        color: theme.palette.otherColors.white,
        padding: `${pxToRem(16)}`,
        borderRadius: pxToRem(8),
        textTransform: "none",
        boxShadow: "none",
        backgroundColor: theme.palette.grey[900],
        "&:hover": {
          boxShadow: "none",
          backgroundColor: theme.palette.grey[500],
        },
        ...sx, // Consente la personalizzazione degli stili
      }}
      {...props} // Passa ulteriori props al componente Button
    >
      {children}
    </Button>
  );
};

ButtonPrimary.propTypes = {
  children: PropTypes.node.isRequired, // Contenuto del pulsante (es. testo o icona)
  sx: PropTypes.object, // Stili personalizzati opzionali
};

export default ButtonPrimary;
