import React, { useEffect, useState } from "react";
import {
  Box,
  InputBase,
  Select,
  MenuItem,
  Typography,
  InputAdornment,
} from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import dropdownIcon from "@assets/images/icon-caret-down.svg";
import { pxToRem } from "@utils/pxToRem";

const BasicInput = ({
  label = "",
  error = false,
  errorText = "",
  infoText = "",
  startIcon = null,
  endIcon = null,
  prefix = "",
  options = null,
  value = "",
  onChange = () => {},
  sx = {},
  ...props
}) => {
  const theme = useTheme();
  const [currentSelection, setCurrentSelection] = useState({
    value: "",
    label: "",
    color: "",
  });

  // Gestisco l'aggiornamento della selezione
  const handleChange = (selectedValue) => {
    const selectedOption = options?.find(
      (option) => option.value === selectedValue
    );
    const newSelection = {
      value: selectedOption?.value || "",
      label: selectedOption?.label || "",
      color: selectedOption?.color || "",
    };
    setCurrentSelection(newSelection);
    onChange(newSelection); // Passo il nuovo oggetto al parent
  };

  useEffect(() => {
    // Sincronizzo il valore iniziale
    if (options && value) {
      const selectedOption = options.find((option) => option.value === value);
      if (selectedOption) {
        setCurrentSelection({
          value: selectedOption.value,
          label: selectedOption.label,
          color: selectedOption.color || "",
        });
      }
    }
  }, [value, options]);

  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: pxToRem(16),
        ...sx,
      }}>
      {/* Etichetta personalizzata sopra l'input */}
      {label && (
        <Typography
          sx={{
            typography: "textPreset5Bold",
            color: theme.palette.grey[500],
            marginBottom: pxToRem(4),
          }}>
          {label}
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: pxToRem(45),
          border: `1px solid ${
            error ? theme.palette.secondaryColors.red : theme.palette.beige[500]
          }`,
          borderRadius: pxToRem(8),
          padding: `${pxToRem(12)} ${pxToRem(20)}`,
          backgroundColor: "transparent",
          "&:hover": {
            borderColor: error
              ? theme.palette.secondaryColors.red
              : theme.palette.grey[400],
          },
          "&.Mui-focused": {
            borderColor: error
              ? theme.palette.secondaryColors.red
              : theme.palette.grey[900],
          },
        }}>
        {/* Prefisso (se presente) */}
        {prefix && (
          <Typography
            sx={{
              marginRight: pxToRem(12),
              color: theme.palette.beige[500],
              typography: "textPreset4",
            }}>
            {prefix}
          </Typography>
        )}

        {/* Select Condizionale */}
        {options ? (
          <Select
            fullWidth
            value={currentSelection.value}
            onChange={(e) => handleChange(e.target.value)}
            // displayEmpty
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: pxToRem(300),
                  borderRadius: pxToRem(8),
                  padding: `${pxToRem(12)} ${pxToRem(20)}`,
                  overflowY: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                },
              },
            }}
            sx={{
              typography: "textPreset4",
              color: theme.palette.grey[900],
              border: "none",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: 0,
              },
            }}
            IconComponent={() => (
              <img
                src={dropdownIcon}
                alt="Dropdown Icon"
                style={{
                  width: pxToRem(16),
                  height: pxToRem(16),
                  position: "absolute",
                  right: pxToRem(4),
                }}
              />
            )}
            {...props}>
            {options.map((option, index) => (
              <MenuItem
                key={index}
                value={option.value}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  typography: "textPreset4",
                  color: theme.palette.grey[900],
                  padding: `${pxToRem(12)} ${pxToRem(0)}`,
                  borderBottom:
                    index !== options.length - 1
                      ? `1px solid ${theme.palette.grey[100]}`
                      : "none",
                  "&:hover": {
                    backgroundColor: theme.palette.grey[100],
                  },
                }}>
                {option.color && (
                  <Box
                    sx={{
                      display: "inline-flex",
                      width: pxToRem(16),
                      height: pxToRem(16),
                      borderRadius: "50%",
                      backgroundColor: option.color,
                      marginRight: pxToRem(12),
                    }}
                  />
                )}
                {option.label}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <InputBase
            fullWidth
            sx={{
              typography: "textPreset4",
              color: theme.palette.grey[900],
              "&::placeholder": {
                color: theme.palette.beige[500],
                opacity: 1,
              },
            }}
            {...props}
          />
        )}

        {/* Icona finale (se presente) */}
        {endIcon && (
          <InputAdornment position="end" sx={{ marginRight: pxToRem(8) }}>
            {endIcon}
          </InputAdornment>
        )}
      </Box>

      {/* Messaggio di errore sotto l'input */}
      {error && errorText && (
        <Typography
          sx={{
            typography: "textPreset4",
            color: theme.palette.secondaryColors.red,
            marginTop: pxToRem(4),
          }}>
          {errorText}
        </Typography>
      )}
      {/* Messaggio informativo sotto l'input */}
      {infoText && (
        <Typography
          sx={{
            typography: "textPreset5",
            color: theme.palette.grey[500],
            display: "flex",
            justifyContent: "flex-end",
            marginTop: pxToRem(4),
          }}>
          {infoText}
        </Typography>
      )}
    </Box>
  );
};

BasicInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  colorTag: PropTypes.string,
  prefix: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      color: PropTypes.string,
    })
  ),
  value: PropTypes.string,
  onChange: PropTypes.func,
  sx: PropTypes.object,
};

export default BasicInput;
