import React from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

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

        ...sx, // Permette di aggiungere stile personalizzato
      }}
      {...props} // Passa qualsiasi altra prop
    >
      {children}
    </Button>
  );
};

ButtonDestroy.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default ButtonDestroy;
