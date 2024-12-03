import React, { useState } from "react";
import BasicInput from "@components/inputFields/BasicInput";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { colorOptions } from "@components/colors/colorOptions";
import { categoryOptions } from "@components/category/categoryOptions";

const ModalAdd = ({
  data,
  onColorChange,
  onCategoryChange,
  onSubmit,
  buttonLabel,
}) => {
  const theme = useTheme();
  const [maximum, setMaximum] = useState(data?.maximum || "");
  const [categoryValue, setCategoryValue] = useState(
    data?.category || categoryOptions[0]?.value
  );
  const [colorValue, setColorValue] = useState(
    data?.color || colorOptions[0]?.value
  );

  const handleColorChange = (selectedOption) => {
    setColorValue(selectedOption.value); // Imposta il valore del colore selezionato
    onColorChange(selectedOption); // Callback per comunicare al genitore
  };

  const handleCategoryChange = (selectedOption) => {
    setCategoryValue(selectedOption.label); // Imposta il valore della categoria selezionata
    onCategoryChange(selectedOption); // Callback per comunicare al genitore
  };

  const handleSubmit = () => {
    if (!categoryValue || !maximum || !colorValue) {
      alert("All fields are required.");
      return;
    }
    onSubmit({
      category: categoryValue,
      maximum: parseFloat(maximum),
      color: colorValue,
    });
  };
  return (
    <>
      <Typography
        sx={{
          typography: theme.typography.textPreset4,
          color: theme.palette.grey[500],
          marginBottom: pxToRem(20),
        }}>
        Choose a category to set a spending budget. These categories can help
        you monitor spending.
      </Typography>

      <BasicInput
        fullWidth
        label="Budget Category"
        options={categoryOptions}
        value={categoryValue}
        onChange={(selectedOption) => handleCategoryChange(selectedOption)}
        sx={{ marginBottom: pxToRem(16) }}
      />
      <BasicInput
        fullWidth
        label="Maximum Spend"
        prefix="$"
        type="number"
        placeholder="e.g. 2000"
        value={maximum}
        onChange={(e) => setMaximum(e.target.value)}
        sx={{
          marginBottom: pxToRem(16),
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            {
              WebkitAppearance: "none",
              margin: 0,
            },
          "& input[type=number]": {
            MozAppearance: "textfield", // Per Firefox
          },
        }}
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
  onCategoryChange: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default ModalAdd;
