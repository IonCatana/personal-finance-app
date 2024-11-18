import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

const InfoCard = ({ label, value, color, sx = {}, ...props }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor:
          props.backgroundColor || theme.palette.otherColors.white,
        padding: `${pxToRem(0)} ${pxToRem(0)} ${pxToRem(0)} ${pxToRem(16)}`,
        width: "100%",
        maxHeight: pxToRem(43),
        borderRadius: pxToRem(8),
        position: "relative",
        "&:after": color
          ? {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 0,
              width: pxToRem(4),
              height: "100%",
              backgroundColor: color,
              borderRadius: `${pxToRem(8)} ${pxToRem(8)} ${pxToRem(
                8
              )} ${pxToRem(8)}`,
            }
          : {},
        ...sx,
      }}
      {...props}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
        {label && (
          <Typography
            sx={{
              typography: "textPreset5",
              color: theme.palette.grey[500],
              marginBottom: label ? pxToRem(4) : 0,
            }}>
            {label}
          </Typography>
        )}
        {value && (
          <Typography
            sx={{
              typography: "textPreset4Bold",
              color: theme.palette.grey[900],
            }}>
            {value}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

InfoCard.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  color: PropTypes.string,
  sx: PropTypes.object,
};

export default InfoCard;
