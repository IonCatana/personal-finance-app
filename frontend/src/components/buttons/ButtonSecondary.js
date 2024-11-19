import React from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

/**
 * ButtonSecondary
 * -------------------------------
 * Questo componente rappresenta un pulsante secondario, usato per azioni meno importanti
 * o secondarie rispetto al pulsante primario. Ha uno stile più delicato per indicare
 * che l'azione non è critica.
 *
 * Props:
 * - children (node, obbligatoria): Contenuto del pulsante (es. "Cancel" o "Back").
 * - sx (object, opzionale): Stili personalizzati per il pulsante.
 * - ...props (object): Altre proprietà che vengono passate al componente Button di Material-UI.
 *
 * Uso:
 * - Ideale per azioni di supporto come annullare un'operazione o tornare indietro.
 * - Supporta personalizzazioni tramite `sx` o altre props.
 *
 * Esempio:
 * <ButtonSecondary onClick={() => console.log("Azione secondaria eseguita")}>
 *   Cancel
 * </ButtonSecondary>
 */
const ButtonSecondary = ({ children, sx = {}, ...props }) => {
  const theme = useTheme();

  return (
    <Button
      variant="contained"
      sx={{
        typography: "textPreset4Bold",
        color: theme.palette.grey[900],
        padding: `${pxToRem(16)}`,
        borderRadius: pxToRem(8),
        textTransform: "none",
        border: `1px solid ${theme.palette.beige[100]}`,
        boxShadow: "none",
        backgroundColor: theme.palette.beige[100],
        "&:hover": {
          boxShadow: "none",
          backgroundColor: theme.palette.otherColors.white,
          border: `1px solid ${theme.palette.beige[500]}`,
        },
        ...sx, // Consente la personalizzazione degli stili
      }}
      {...props} // Passa ulteriori props al componente Button
    >
      {children}
    </Button>
  );
};

ButtonSecondary.propTypes = {
  children: PropTypes.node.isRequired, // Contenuto del pulsante (es. testo o icona)
  sx: PropTypes.object, // Stili personalizzati opzionali
};

export default ButtonSecondary;
