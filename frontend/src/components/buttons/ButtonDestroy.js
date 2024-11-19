import React from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

/**
 * ButtonDestroy
 * -------------------------------
 * Questo componente rappresenta un pulsante "distruttivo", usato per azioni
 * che potrebbero comportare modifiche irreversibili, come l'eliminazione.
 *
 * Props:
 * - children (node, obbligatoria): Contenuto del pulsante (es. "Delete").
 * - sx (object, opzionale): Stili personalizzati per il pulsante.
 * - ...props (object): Altre proprietà che vengono passate al componente Button di Material-UI.
 *
 * Uso:
 * - Ideale per azioni distruttive, come eliminare un elemento o resettare dati.
 * - Può essere utilizzato con icone o solo testo.
 *
 * Esempio:
 * <ButtonDestroy onClick={() => console.log("Elemento eliminato")}>
 *   Delete
 * </ButtonDestroy>
 */
const ButtonDestroy = ({ children, sx = {}, ...props }) => {
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
        backgroundColor: theme.palette.secondaryColors.red,
        transition: "opacity 0.3s ease",
        "&:hover": {
          boxShadow: "none",
          backgroundColor: theme.palette.secondaryColors.red,
          opacity: 0.8,
        },
        ...sx, // Consente la personalizzazione degli stili
      }}
      {...props} // Passa ulteriori props al componente Button
    >
      {children}
    </Button>
  );
};

ButtonDestroy.propTypes = {
  children: PropTypes.node.isRequired, // Contenuto del pulsante (es. testo o icona)
  sx: PropTypes.object, // Stili personalizzati opzionali
};

export default ButtonDestroy;
