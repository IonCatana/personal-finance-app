import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import logoLarge from "@assets/images/logo-large.svg";
import logoSmall from "@assets/images/logo-small.svg";
import { pxToRem } from "@utils/pxToRem";

const Logo = ({ type = "large", sx = {} }) => {
  // Gestione dinamica del logo in base al tipo
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

  // Stile dinamico per la dimensione del logo
  const getLogoStyle = () => {
    switch (type) {
      case "large":
        return { width: pxToRem(121.45), height: pxToRem(21.76) }; // Logo grande
      case "small":
        return { width: pxToRem(12.48), height: pxToRem(21.44) }; // Logo piccolo
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
        src={getLogoSrc()}
        alt="Finance Logo"
        sx={{
          ...getLogoStyle(),
          ...sx, // Permette di sovrascrivere gli stili tramite props
        }}
      />
    </Box>
  );
};

Logo.propTypes = {
  type: PropTypes.oneOf(["large", "small"]), // Tipi accettati
  sx: PropTypes.object, // Stili aggiuntivi
};

export default Logo;
