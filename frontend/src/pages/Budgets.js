import React from "react";
import { Box } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import ButtonPrimary from "@components/buttons/ButtonPrimary";

const BudgetsContent = () => {
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
        Budgets
      </Box>
      <Box>
        <ButtonPrimary>+ Add New Budget</ButtonPrimary>
      </Box>
    </Box>
  );
};

export default BudgetsContent;
