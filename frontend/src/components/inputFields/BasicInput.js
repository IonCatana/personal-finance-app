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

/**
 * BasicInput
 * -------------------------------
 * Questo componente rappresenta un campo di input altamente configurabile.
 * Può essere utilizzato sia come input base che come select con opzioni.
 *
 * Funzionalità:
 * - Supporta etichetta, messaggi di errore e informazioni aggiuntive.
 * - Può includere un prefisso, un'icona iniziale o finale.
 * - Permette di passare opzioni per trasformarlo in un menu a tendina (select).
 * - Personalizzabile tramite `sx` per integrazione visiva.
 *
 * Props:
 * - label (string, opzionale): Testo visualizzato sopra l'input.
 * - error (bool, opzionale): Indica se l'input è in stato di errore.
 * - errorText (string, opzionale): Messaggio di errore mostrato sotto l'input.
 * - infoText (string, opzionale): Messaggio informativo mostrato sotto l'input.
 * - startIcon (node, opzionale): Icona opzionale visualizzata all'inizio.
 * - endIcon (node, opzionale): Icona opzionale visualizzata alla fine.
 * - prefix (string, opzionale): Prefisso visualizzato prima dell'input.
 * - options (array, opzionale): Lista di opzioni per trasformare l'input in un menu a tendina.
 * - value (string, opzionale): Valore corrente dell'input o del menu a tendina.
 * - onChange (function, opzionale): Funzione chiamata quando il valore cambia.
 * - sx (object, opzionale): Stili personalizzati.
 *
 * Stato:
 * - currentSelection: Gestisce la selezione attuale per il menu a tendina.
 *
 * Uso:
 * - Ideale per moduli che richiedono input configurabili o selezioni.
 *
 * Esempio:
 * <BasicInput
 *   label="Email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   error={isError}
 *   errorText="Inserisci un'email valida"
 * />
 */
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

  /**
   * Gestisce il cambio di valore per il menu a tendina.
   * Trova l'opzione selezionata e aggiorna lo stato.
   */
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
    onChange(newSelection); // Passa il nuovo oggetto al parent
  };

  /**
   * Sincronizza il valore iniziale con lo stato della selezione.
   */
  useEffect(() => {
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
      {/* Etichetta sopra l'input */}
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

        {/* Input o Select Condizionale */}
        {options ? (
          <Select
            fullWidth
            value={currentSelection.value}
            onChange={(e) => handleChange(e.target.value)}
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
            renderValue={(selectedValue) => {
              const selectedOption = options.find(
                (option) => option.value === selectedValue
              );
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
                sx={{
                  borderBottom: `1px solid ${theme.palette.grey[100]}`,
                }}
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
  label: PropTypes.string, // Testo sopra l'input
  error: PropTypes.bool, // Stato di errore
  errorText: PropTypes.string, // Messaggio di errore
  startIcon: PropTypes.node, // Icona opzionale all'inizio
  endIcon: PropTypes.node, // Icona opzionale alla fine
  prefix: PropTypes.string, // Prefisso dell'input
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      color: PropTypes.string,
    })
  ), // Opzioni per trasformare l'input in un select
  value: PropTypes.string, // Valore corrente
  onChange: PropTypes.func, // Funzione chiamata al cambio di valore
  sx: PropTypes.object, // Stili personalizzati
};

export default BasicInput;
