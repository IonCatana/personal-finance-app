import React from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

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

        ...sx, // Permette di aggiungere stile personalizzato
      }}
      {...props} // Passa qualsiasi altra prop
    >
      {children}
    </Button>
  );
};

ButtonSecondary.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default ButtonSecondary;
