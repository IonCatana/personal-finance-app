import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

const SectionHeaderContent = ({
  title,
  buttonLabel,
  onButtonClick,
  buttonComponent: ButtonComponent,
}) => {
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
      <Typography
        sx={{
          typography: "textPreset1",
          color: theme.palette.grey[900],
        }}>
        {title}
      </Typography>
      {buttonLabel && ButtonComponent && (
        <Box>
          <ButtonComponent onClick={onButtonClick}>
            {buttonLabel}
          </ButtonComponent>
        </Box>
      )}
    </Box>
  );
};

SectionHeaderContent.propTypes = {
  title: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string,
  onButtonClick: PropTypes.func,
  buttonComponent: PropTypes.elementType,
};

export default SectionHeaderContent;
