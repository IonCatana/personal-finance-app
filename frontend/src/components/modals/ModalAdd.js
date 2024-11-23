import React, { useState } from "react";
import BasicInput from "@components/inputFields/BasicInput";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { colorOptions } from "@components/colors/colorOptions";

const ModalAdd = ({ data, onColorChange, onSubmit, buttonLabel }) => {
  const theme = useTheme();
  const [name, setName] = useState(data?.name || "");
  const [target, setTarget] = useState(data?.target || "");
  const [colorValue, setColorValue] = useState(
    data?.color || colorOptions[0]?.value
  );

  const handleColorChange = (selectedOption) => {
    setColorValue(selectedOption.value); // Imposta il valore del colore selezionato
    onColorChange(selectedOption); // Callback per comunicare al genitore
  };

  const handleSubmit = () => {
    if (!name || !target || !colorValue) {
      alert("All fields are required.");
      return;
    }
    onSubmit({ name, target: parseFloat(target), color: colorValue });
  };
  return (
    <>
      <Typography
        sx={{
          typography: theme.typography.textPreset4,
          color: theme.palette.grey[500],
          marginBottom: pxToRem(20),
        }}>
        Create a pot to set savings targets. These can help keep you on track as
        you save for special purchases.
      </Typography>

      <BasicInput
        fullWidth
        label="Pot Name"
        infoText="X characters left"
        placeholder="e.g. Rainy Days"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginBottom: pxToRem(16) }}
      />
      <BasicInput
        fullWidth
        label="Target"
        prefix="$"
        placeholder="e.g. 2000"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        sx={{ marginBottom: pxToRem(16) }}
      />
      <BasicInput
        label="Theme"
        options={colorOptions}
        value={colorValue}
        onChange={(selectedOption) => handleColorChange(selectedOption)}
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

ModalAdd.propTypes = {
  data: PropTypes.object,
  onColorChange: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default ModalAdd;
