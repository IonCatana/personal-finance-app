import React from "react";
import BasicInput from "@components/inputFields/BasicInput";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ModalAdd = ({ data, options, selectedTheme, onThemeChange }) => {
  const theme = useTheme();
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
        defaultValue={data?.name || ""}
        sx={{ marginBottom: pxToRem(16) }}
      />
      <BasicInput
        fullWidth
        label="Target"
        prefix="$"
        placeholder="e.g. 2000"
        defaultValue={data?.target || ""}
        sx={{ marginBottom: pxToRem(16) }}
      />
      <BasicInput
        label="Theme"
        options={options}
        value={selectedTheme}
        onChange={onThemeChange}
      />
    </>
  );
};

ModalAdd.propTypes = {
  data: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  selectedTheme: PropTypes.string.isRequired,
  onThemeChange: PropTypes.func.isRequired,
};

export default ModalAdd;
