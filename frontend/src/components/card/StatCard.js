import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

const StatCard = ({ title, value, color, backgroundColor }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: backgroundColor || {
          backgroundColor: theme.palette.otherColors.white,
        },
        color: color || { color: theme.palette.grey[900] },
        borderRadius: pxToRem(12),
        padding: {
          xs: `${pxToRem(20)} ${pxToRem(20)}`,
          sm: `${pxToRem(24)}`,
          md: `${pxToRem(24)}`,
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: pxToRem(12),
        justifyContent: "center",
        width: "100%",
      }}>
      <Typography
        sx={{
          typography: "textPreset4",
          color: color || { color: theme.palette.grey[500] },
        }}>
        {title}
      </Typography>
      <Typography
        sx={{
          typography: "textPreset1",
          color: color || { color: theme.palette.grey[900] },
        }}>
        {value}
      </Typography>
    </Box>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  icon: PropTypes.node,
};

export default StatCard;
