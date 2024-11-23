// src/components/modals/ModalEdit.js
import React, { useState } from "react";
import BasicInput from "@components/inputFields/BasicInput";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { colorOptions } from "@components/colors/colorOptions";

const ModalEdit = ({ data = {}, onColorChange, onSubmit }) => {
  const theme = useTheme();
  const [name, setName] = useState(data?.name || "");
  const [target, setTarget] = useState(data?.target?.toString() || "");
  const [colorValue, setcolorValue] = useState(data?.color || "");

  const normalizeSpaces = (str) => {
    return str.trim().replace(/\s+/g, " ");
  };

  const handleColorChange = (newSelection) => {
    setcolorValue(newSelection.value);
    onColorChange(newSelection);
  };

  const handleSubmit = () => {
    if (!name || !target || !colorValue) {
      alert("All fields are required.");
      return;
    }
    onSubmit({
      ...data,
      name: normalizeSpaces(name),
      target: parseFloat(normalizeSpaces(target)),
      color: colorValue,
    });
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
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginBottom: pxToRem(16) }}
      />

      {/* Target Input */}
      <BasicInput
        fullWidth
        label="Target"
        prefix="$"
        placeholder={`e.g. ${data?.target || "2000"}`}
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        sx={{ marginBottom: pxToRem(16) }}
      />

      {/* Theme Input */}
      <BasicInput
        label="Theme"
        options={colorOptions}
        value={colorValue}
        onChange={(e) => {
          handleColorChange(e);
        }}
      />
      <ButtonPrimary
        fullWidth
        onClick={handleSubmit}
        sx={{ marginTop: pxToRem(4) }}>
        Save Changes
      </ButtonPrimary>
    </>
  );
};

ModalEdit.propTypes = {
  data: PropTypes.object,
  onColorChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ModalEdit;
