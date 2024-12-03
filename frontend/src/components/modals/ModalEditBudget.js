import React, { useState } from "react";
import BasicInput from "@components/inputFields/BasicInput";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { colorOptions } from "@components/colors/colorOptions";
import { categoryOptions } from "@components/category/categoryOptions";

const ModalEditBudget = ({
  data,
  onColorChange,
  onCategoryChange,
  onSubmit,
  buttonLabel = "Save Changes",
}) => {
  const theme = useTheme();
  const [maximum, setMaximum] = useState(data?.maximum?.toString() || "");
  const [categoryValue, setCategoryValue] = useState(data?.category || "");
  const [colorValue, setColorValue] = useState(data?.color || "");

  const handleColorChange = (selectedOption) => {
    setColorValue(selectedOption.value); // Imposta il valore del colore selezionato
    onColorChange(selectedOption); // Callback per comunicare al genitore
  };

  const handleCategoryChange = (selectedOption) => {
    setCategoryValue(selectedOption.value); // Imposta il valore della categoria selezionata
    onCategoryChange(selectedOption); // Callback per comunicare al genitore
  };

  const handleSubmit = () => {
    if (!categoryValue || !maximum || !colorValue) {
      alert("All fields are required.");
      return;
    }
    onSubmit({
      ...data,
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
        As your budgets change, feel free to update your spending limits.
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

ModalEditBudget.propTypes = {
  data: PropTypes.object.isRequired,
  onColorChange: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default ModalEditBudget;
