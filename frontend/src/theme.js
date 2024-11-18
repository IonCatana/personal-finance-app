import { createTheme } from "@mui/material/styles";
import { pxToRem } from "@utils/pxToRem";

const theme = createTheme({
  // COLORS
  palette: {
    beige: {
      500: "#98908B",
      100: "#F8F4F0",
    },
    grey: {
      900: "#201F24",
      500: "#696868",
      300: "#B3B3B3",
      100: "#F2F2F2",
    },
    secondaryColors: {
      green: "#277C78",
      yellow: "#F2CDAC",
      cyan: "#82C9D7",
      navy: "#626070",
      red: "#C94736",
      purple: "#826CB0",
    },
    otherColors: {
      purple: "#AF81BA",
      turquoise: "#597C7C",
      brown: "#93674F",
      magenta: "#934F6F",
      blue: "#3F82B2",
      navyGrey: "#97A0AC",
      armyGreen: "#7F9161",
      gold: "#CAB361",
      orange: "#BE6C49",
      white: "#FFFFFF",
    },
  },
  // TYPOGRAPHY
  typography: {
    fontFamily: '"Public Sans", sans-serif',
    textPreset1: {
      fontSize: pxToRem(32),
      fontWeight: "bold",
      lineHeight: 1.2,
      letterSpacing: pxToRem(0),
    },
    textPreset2: {
      fontSize: pxToRem(20),
      fontWeight: "bold",
      lineHeight: 1.2,
      letterSpacing: pxToRem(0),
    },
    textPreset3: {
      fontSize: pxToRem(16),
      fontWeight: "bold",
      lineHeight: 1.5,
      letterSpacing: pxToRem(0),
    },
    textPreset4: {
      fontSize: pxToRem(14),
      fontWeight: "regular",
      lineHeight: 1.5,
      letterSpacing: pxToRem(0),
    },
    textPreset4Bold: {
      fontSize: pxToRem(14),
      fontWeight: "bold",
      lineHeight: 1.5,
      letterSpacing: pxToRem(0),
    },
    textPreset5: {
      fontSize: pxToRem(12),
      fontWeight: "regular",
      lineHeight: 1.5,
      letterSpacing: pxToRem(0),
    },
    textPreset5Bold: {
      fontSize: pxToRem(12),
      fontWeight: "bold",
      lineHeight: 1.5,
      letterSpacing: pxToRem(0),
    },
  },
});

export default theme;
