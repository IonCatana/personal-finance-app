import React from "react";
import PropTypes from "prop-types";
import { Box, LinearProgress } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

const BudgetProgressBar = ({ percentage, color }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        padding: pxToRem(4),
        borderRadius: pxToRem(8),
        backgroundColor: theme.palette.beige[100],
        marginBottom: pxToRem(16),
      }}>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: pxToRem(24),
          borderRadius: pxToRem(4),
          backgroundColor: theme.palette.beige[100],
          "& .MuiLinearProgress-bar": {
            backgroundColor: color,
            borderRadius: pxToRem(4),
          },
        }}
      />
    </Box>
  );
};

BudgetProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default BudgetProgressBar;
