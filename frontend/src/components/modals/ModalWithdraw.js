import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import BasicInput from "@components/inputFields/BasicInput";
import { useTheme } from "@mui/material/styles";

const ModalWithdraw = ({ data, onSubmit, onCancel }) => {
  const theme = useTheme();
  const [amount, setAmount] = useState("");

  const { total, target } = data;
  const currentPercentage = (total / target) * 100;
  const remainingTotal = Math.max(total - (parseFloat(amount) || 0), 0); // Assicura che non vada sotto 0
  const newPercentage = (remainingTotal / target) * 100;

  const handleAmountChange = (e) => {
    let value = parseFloat(e.target.value) || 0;

    // Impedisce di inserire numeri negativi
    if (value < 0) {
      value = 0; // Imposta il valore a 0 se è negativo
    }

    // Controlla se il valore supera il totale attuale
    if (value > total) {
      value = total; // Imposta il valore massimo possibile
    }

    setAmount(value.toString()); // Aggiorna l'importo visivamente come stringa
  };

  const handleSubmit = () => {
    const withdrawalAmount = parseFloat(amount);

    if (!amount || isNaN(amount) || withdrawalAmount <= 0) {
      alert("Please enter a valid amount to withdraw.");
      return;
    }

    if (withdrawalAmount > total) {
      alert("You cannot withdraw more than the available total.");
      return;
    }

    onSubmit({ ...data, total: remainingTotal });
  };

  return (
    <Box>
      <Typography
        sx={{
          typography: theme.typography.textPreset4,
          color: theme.palette.grey[500],
          marginBottom: pxToRem(16),
        }}>
        Withdraw money from this pot to use for other purposes.
      </Typography>
      {/* Progress Section */}
      <Box sx={{ marginBottom: pxToRem(24) }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: pxToRem(8),
          }}>
          <Typography
            sx={{
              typography: theme.typography.textPreset4,
              color: theme.palette.grey[500],
            }}>
            Remaining Amount
          </Typography>
          <Typography
            sx={{
              typography: theme.typography.textPreset2,
              color: theme.palette.grey[900],
            }}>
            ${remainingTotal.toFixed(2)}
          </Typography>
        </Box>
        <Box
          sx={{
            position: "relative",
            height: pxToRem(8),
            borderRadius: pxToRem(4),
            backgroundColor: theme.palette.beige[100], // Sfondo generale della barra
            overflow: "hidden",
          }}>
          {/* Current Total (barra nera) */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${currentPercentage}%`, // Percentuale attuale del totale
              height: "100%",
              borderRadius: `${pxToRem(4)} ${pxToRem(4)} ${pxToRem(
                4
              )} ${pxToRem(4)}`,
              backgroundColor: "black",
            }}
          />
          {/* Withdrawal Amount (barra rossa) */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: `${(remainingTotal / target) * 100}%`, // La barra rossa parte dal totale rimanente
              width: `${Math.min(
                (parseFloat(amount) / target) * 100,
                currentPercentage
              )}%`, // Percentuale sottratta
              height: "100%",
              borderRadius: `${pxToRem(0)} ${pxToRem(4)} ${pxToRem(
                4
              )} ${pxToRem(0)}`,
              backgroundColor: theme.palette.secondaryColors.red, // Colore rosso
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: pxToRem(2),
                height: "100%",
                backgroundColor: theme.palette.beige[100],
              },
            }}
          />
        </Box>
        {/* Percentage and Target */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: pxToRem(13),
          }}>
          <Typography
            sx={{
              typography: "textPreset5Bold",
              color: theme.palette.grey[500],
            }}>
            {`${newPercentage.toFixed(2)}%`}
          </Typography>
          <Typography
            sx={{
              typography: "textPreset5",
              color: theme.palette.grey[500],
            }}>
            Target of ${target}
          </Typography>
        </Box>
      </Box>
      {/* Amount Input */}
      <BasicInput
        fullWidth
        label="Amount to Withdraw"
        type="number"
        prefix="$"
        value={amount}
        onChange={handleAmountChange}
        placeholder="e.g. 100"
        sx={{
          marginBottom: pxToRem(20),
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
      <ButtonPrimary fullWidth onClick={handleSubmit}>
        Confirm Withdrawal
      </ButtonPrimary>
    </Box>
  );
};

ModalWithdraw.propTypes = {
  data: PropTypes.object.isRequired, // Passa i dati del pot
  onSubmit: PropTypes.func.isRequired, // Funzione chiamata per confermare
  onCancel: PropTypes.func, // Funzione opzionale per annullare
};

export default ModalWithdraw;
