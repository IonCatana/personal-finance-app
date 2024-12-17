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

  const getSelectedOption = (val) => options?.find((opt) => opt.value === val);

  const handleChange = (selectedValue) => {
    const selectedOption = getSelectedOption(selectedValue);
    const newSelection = {
      value: selectedOption?.value || "",
      label: selectedOption?.label || "",
      color: selectedOption?.color || "",
    };
    setCurrentSelection(newSelection);
    onChange(newSelection);
  };

  useEffect(() => {
    if (options && value) {
      const selectedOption = getSelectedOption(value);
      if (selectedOption) {
        setCurrentSelection({
          value: selectedOption.value,
          label: selectedOption.label,
          color: selectedOption.color || "",
        });
      }
    }
    // eslint-disable-next-line
  }, [value, options]);

  const borderColor = error
    ? theme.palette.secondaryColors.red
    : theme.palette.beige[500];
  const hoveredBorderColor = error
    ? theme.palette.secondaryColors.red
    : theme.palette.grey[400];
  const focusedBorderColor = error
    ? theme.palette.secondaryColors.red
    : theme.palette.grey[900];

  const selectMenuProps = {
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
  };

  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: pxToRem(16),
        ...sx,
      }}>
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
          border: `1px solid ${borderColor}`,
          borderRadius: pxToRem(8),
          padding: `${pxToRem(12)} ${pxToRem(20)}`,
          backgroundColor: "transparent",
          "&:hover": {
            borderColor: hoveredBorderColor,
          },
          "&.Mui-focused": {
            borderColor: focusedBorderColor,
          },
        }}>
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

        {options ? (
          <Select
            fullWidth
            value={currentSelection.value}
            onChange={(e) => handleChange(e.target.value)}
            MenuProps={selectMenuProps}
            renderValue={(selectedValue) => {
              const selectedOption = getSelectedOption(selectedValue);
              if (!selectedOption) return null;
              return (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {selectedOption.color && (
                    <Box
                      sx={{
                        display: "inline-flex",
                        width: pxToRem(16),
                        height: pxToRem(16),
                        borderRadius: "50%",
                        backgroundColor: selectedOption.color,
                        marginRight: pxToRem(12),
                      }}
                    />
                  )}
                  {selectedOption.label}
                </Box>
              );
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
                  width: pxToRem(11),
                  height: pxToRem(6),
                  position: "absolute",
                  right: pxToRem(4),
                }}
              />
            )}
            {...props}>
            {options.map((option, index) => (
              <MenuItem
                sx={{ borderBottom: `1px solid ${theme.palette.grey[100]}` }}
                key={index}
                value={option.value}>
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
            placeholder={props.placeHolder}
            value={value}
            onChange={onChange}
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

        {endIcon && <InputAdornment position="end">{endIcon}</InputAdornment>}
      </Box>

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
