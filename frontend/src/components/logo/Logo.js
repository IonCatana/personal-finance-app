import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import logoLarge from "@assets/images/logo-large.svg";
import logoSmall from "@assets/images/logo-small.svg";
import { pxToRem } from "@utils/pxToRem";

/**
 * Logo
 * -------------------------------
 * Questo componente visualizza il logo dell'applicazione, con opzioni per
 * dimensioni differenti (`large` o `small`) e stili personalizzabili.
 *
 * Funzionalità:
 * - Mostra il logo grande o piccolo in base al valore della prop `type`.
 * - Consente di applicare stili aggiuntivi tramite la prop `sx`.
 * - Usa immagini dinamiche per supportare diversi contesti visivi.
 *
 * Props:
 * - type (string, opzionale): Specifica la dimensione del logo.
 *   - "large" (default): Mostra il logo in dimensioni grandi.
 *   - "small": Mostra il logo in dimensioni ridotte.
 * - sx (object, opzionale): Stili personalizzati per il logo.
 *
 * Uso:
 * - Importare e utilizzare ovunque sia necessario un logo.
 *
 * Esempio:
 * <Logo type="small" } />
 */
const Logo = ({ type = "large", sx = {} }) => {
  /**
   * Ottiene l'immagine del logo in base al tipo.
   */
  const getLogoSrc = () => {
    switch (type) {
      case "large":
        return logoLarge;
      case "small":
        return logoSmall;
      default:
        return logoLarge;
    }
  };

  /**
   * Ottiene lo stile dimensionale del logo in base al tipo.
   */
  const getLogoStyle = () => {
    switch (type) {
      case "large":
        return { width: pxToRem(121.45), height: pxToRem(21.76) }; // Logo grande
      case "small":
        return { width: pxToRem(12.48), height: pxToRem(21.76) }; // Logo piccolo
      default:
        return { width: pxToRem(121.45), height: pxToRem(21.76) };
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}>
      <Box
        component="img"
        src={getLogoSrc()} // Immagine dinamica
        alt="Finance Logo"
        sx={{
          ...getLogoStyle(), // Stile dinamico
          ...sx, // Stili personalizzati
        }}
      />
    </Box>
  );
};

Logo.propTypes = {
  type: PropTypes.oneOf(["large", "small"]), // Specifica le dimensioni del logo
  sx: PropTypes.object, // Stili personalizzati opzionali
};

export default Logo;
