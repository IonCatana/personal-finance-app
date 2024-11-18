import React from "react";
import { Box } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

const TransactionsContent = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: pxToRem(56),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: pxToRem(32),
      }}>
      <Box
        sx={{
          typography: "textPreset1",
          color: theme.palette.grey[900],
        }}>
        Transactions
      </Box>
    </Box>
  );
};

export default TransactionsContent;
