import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import ButtonTertiary from "@components/buttons/ButtonTertiary";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

const SectionHeaderCard = ({ title, buttonLabel, onButtonClick }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: pxToRem(20),
      }}>
      <Typography
        sx={{
          typography: "textPreset2",
          color: theme.palette.grey[900],
        }}>
        {title}
      </Typography>
      {buttonLabel && onButtonClick && (
        <ButtonTertiary withIcon onClick={onButtonClick}>
          {buttonLabel}
        </ButtonTertiary>
      )}
    </Box>
  );
};

SectionHeaderCard.propTypes = {
  title: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string,
  onButtonClick: PropTypes.func,
};

export default SectionHeaderCard;
