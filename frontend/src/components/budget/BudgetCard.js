import React from "react";
import { Box, Typography } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

const BudgetCard = ({ category, spentAmount = 0, maximum = 0, color }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: `${pxToRem(16)} ${pxToRem(0)}`,
        borderBottom: `1px solid ${theme.palette.grey[100]}`,
        gap: pxToRem(12),
      }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}>
        <Box
          sx={{
            width: pxToRem(4),
            height: pxToRem(21),
            borderRadius: pxToRem(8),
            backgroundColor: color,
            marginRight: pxToRem(16),
          }}
        />
        <Typography
          sx={{
            Typography: "textPreset5",
            color: theme.palette.grey[500],
          }}>
          {category}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: pxToRem(8),
          textAlign: "right",
        }}>
        <Typography
          sx={{
            typography: "textPreset3",
            color: theme.palette.grey[900],
          }}>
          ${spentAmount.toFixed(2)}
        </Typography>
        <Typography
          sx={{
            typography: "textPreset5",
            color: theme.palette.grey[500],
          }}>
          of ${maximum.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default BudgetCard;
