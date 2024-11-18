import React from "react";
import { Box, Typography } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import Logo from "@components/logo/Logo";
import { useTheme } from "@mui/material/styles";

const IllustrationSection = ({ illustrationSrc, title, description }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        maxWidth: pxToRem(600),
        width: "100%",
        flexDirection: "column",
        backgroundColor: "#F2F3F7",
        padding: pxToRem(20),
        position: "relative",
      }}>
      <Box
        component="img"
        src={illustrationSrc}
        alt="Illustration"
        sx={{ width: "100%", borderRadius: pxToRem(12) }}
      />
      {/* Logo visibile solo sopra 900px */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          position: "absolute",
          top: pxToRem(0),
          left: pxToRem(0),
          width: "100%",
          height: pxToRem(21.76),
          zIndex: 1000,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            position: "absolute",
            top: pxToRem(60),
            left: pxToRem(60),
            zIndex: 1000,
          }}>
          <Logo type="large" />
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          padding: `${pxToRem(0)} ${pxToRem(60)} ${pxToRem(60)}`,
        }}>
        <Typography
          variant="h1"
          sx={{
            typography: "textPreset1",
            color: theme.palette.otherColors.white,
            marginBottom: pxToRem(24),
          }}>
          {title}
        </Typography>
        <Box
          sx={{
            typography: "textPreset4",
            color: theme.palette.otherColors.white,
          }}>
          {description}
        </Box>
      </Box>
    </Box>
  );
};

export default IllustrationSection;
