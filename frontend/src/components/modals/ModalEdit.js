// src/components/modals/ModalEdit.js
import React, { useState } from "react";
import BasicInput from "@components/inputFields/BasicInput";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { colorOptions } from "@components/colors/colorOptions";

const ModalEdit = ({ data, onThemeChange }) => {
  const theme = useTheme();
  const [themeValue, setThemeValue] = useState(data?.theme || "");

  const handleThemeChange = (newSelection) => {
    setThemeValue(newSelection.value);
    onThemeChange(newSelection);
  };

  return (
    <>
      {/* Guidance Message */}
      <Typography
        sx={{
          typography: theme.typography.textPreset4,
          color: theme.palette.grey[500],
          marginBottom: pxToRem(20),
        }}>
        If your saving targets change, feel free to update your pots.
      </Typography>

      {/* Pot Name Input */}
      <BasicInput
        fullWidth
        label="Pot Name"
        infoText="X characters left"
        placeholder={`e.g. ${data?.name || "Rainy Days"}`}
        defaultValue={data?.name || ""}
        sx={{ marginBottom: pxToRem(16) }}
      />

      {/* Target Input */}
      <BasicInput
        fullWidth
        label="Target"
        prefix="$"
        placeholder={`e.g. ${data?.target || "2000"}`}
        defaultValue={data?.target || ""}
        sx={{ marginBottom: pxToRem(16) }}
      />

      {/* Theme Input */}
      <BasicInput
        label="Theme"
        options={colorOptions}
        value={themeValue}
        onChange={handleThemeChange}
      />
    </>
  );
};

ModalEdit.propTypes = {
  data: PropTypes.object.isRequired,
  onThemeChange: PropTypes.func.isRequired,
};

export default ModalEdit;
