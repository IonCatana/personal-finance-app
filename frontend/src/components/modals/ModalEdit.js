// src/components/modals/ModalEdit.js
import React, { useState } from "react";
import BasicInput from "@components/inputFields/BasicInput";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { colorOptions } from "@components/colors/colorOptions";

const ModalEdit = ({ data = {}, onColorChange, onSubmit, buttonLabel }) => {
  const theme = useTheme();
  const MAX_CHARACTERS = 30;
  const [name, setName] = useState(data?.name || "");
  const [target, setTarget] = useState(data?.target?.toString() || "");
  const [colorValue, setcolorValue] = useState(data?.color || "");
  const [error, setError] = useState(false);

  const normalizeSpaces = (str) => {
    return str.trim().replace(/\s+/g, " ");
  };

  const handleColorChange = (newSelection) => {
    setcolorValue(newSelection.value);
    onColorChange(newSelection);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.length > MAX_CHARACTERS) {
      setError(true);
      return;
    }
    setError(false);
    setName(value);
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

      <BasicInput
        fullWidth
        label="Pot Name"
        infoText={`${MAX_CHARACTERS - name.length} characters left`}
        placeholder={`e.g. ${data?.name || "Rainy Days"}`}
        value={name}
        onChange={handleNameChange}
        error={error}
        errorText={error ? "You have reached the maximum character limit." : ""}
        sx={{ marginBottom: pxToRem(16) }}
      />

      <BasicInput
        fullWidth
        label="Target"
        type="number"
        prefix="$"
        placeholder={`e.g. ${data?.target || "2000"}`}
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        sx={{
          marginBottom: pxToRem(16),
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            {
              WebkitAppearance: "none",
              margin: 0,
            },
          "& input[type=number]": {
            MozAppearance: "textfield", 
          },
        }}
      />

      <BasicInput
        label="Color Tag"
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
        {buttonLabel}
      </ButtonPrimary>
    </>
  );
};

ModalEdit.propTypes = {
  data: PropTypes.object,
  onColorChange: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default ModalEdit;
