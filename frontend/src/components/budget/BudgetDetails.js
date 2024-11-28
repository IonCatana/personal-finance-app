import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

const BudgetDetails = ({ spentAmount, remaining, color }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: { xs: "grid", sm: "flex" },
        gridTemplateColumns: "repeat(2 ,1fr)",
        justifyContent: "space-between",
        gap: pxToRem(12),
        width: "100%",
      }}>
      <Box
        sx={{
          flex: 1,
          paddingLeft: pxToRem(20),
          position: "relative",
          "&:after": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            width: pxToRem(4),
            borderRadius: `${pxToRem(8)}`,
            height: "100%",
            backgroundColor: color,
          },
        }}>
        <Typography
          sx={{
            typography: "textPreset5",
            color: theme.palette.grey[500],
            marginBottom: pxToRem(4),
          }}>
          Spent
        </Typography>
        <Typography
          sx={{
            typography: "textPreset4Bold",
            color: theme.palette.grey[900],
          }}>
          ${spentAmount.toFixed(2)}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          paddingLeft: pxToRem(20),
          position: "relative",
          "&:after": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            width: pxToRem(4),
            borderRadius: `${pxToRem(8)}`,
            height: "100%",
            backgroundColor: theme.palette.beige[100],
          },
        }}>
        <Typography
          sx={{
            typography: "textPreset5",
            color: theme.palette.grey[500],
            marginBottom: pxToRem(4),
          }}>
          Remaining
        </Typography>
        <Typography
          sx={{
            typography: "textPreset4Bold",
            color: theme.palette.grey[900],
          }}>
          ${remaining.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

BudgetDetails.propTypes = {
  spentAmount: PropTypes.number.isRequired,
  remaining: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default BudgetDetails;
