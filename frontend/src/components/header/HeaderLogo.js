import React from "react";
import { Box } from "@mui/material";
import Logo from "@components/logo/Logo";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

const HeaderLogo = () => {
  const theme = useTheme();

  const commonBoxStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    // Header visibile solo sotto 900px
    <Box
      sx={{
        display: { xs: "flex", md: "none" },
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: pxToRem(70),
        padding: `${pxToRem(24)} ${pxToRem(40)}`,
        zIndex: 1000,
        alignItems: "center",
        justifyContent: "center",
      }}>
      {/* Header con il logo per schermi piccoli */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: pxToRem(70),
          backgroundColor: theme.palette.grey[900],
          zIndex: 1000,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: `${pxToRem(0)} ${pxToRem(0)} ${pxToRem(12)} ${pxToRem(
            12
          )}`,
        }}>
        <Box
          sx={{
            ...commonBoxStyles,
          }}>
          <Logo type="large" />
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderLogo;
