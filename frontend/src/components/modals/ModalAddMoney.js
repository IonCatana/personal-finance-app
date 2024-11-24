import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, LinearProgress } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import BasicInput from "@components/inputFields/BasicInput";
import { useTheme } from "@mui/material/styles";

const ModalAddMoney = ({ data, onSubmit, onCancel }) => {
  const theme = useTheme();
  const [amount, setAmount] = useState("");

  const { total, target, color } = data;
  const currentPercentage = (total / target) * 100;
  const addedPercentage = ((parseFloat(amount) || 0) / target) * 100; // Percentuale dell'importo aggiunto
  const newTotal = total + (parseFloat(amount) || 0);
  // const newPercentage = Math.min((newTotal / target) * 100, 100);

  // Calcola l'importo massimo che può essere aggiunto senza superare il 100%
  const maxAmount = target - total;

  const handleAmountChange = (e) => {
    let value = parseFloat(e.target.value) || 0;
    if (value > maxAmount) {
      value = maxAmount; // Imposta automaticamente al massimo aggiungibile
    }
    setAmount(value.toString());
  };

  const handleSubmit = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount to add.");
      return;
    }
    onSubmit({ ...data, total: total + parseFloat(amount) });
  };

  return (
    <Box>
      <Typography
        sx={{
          typography: theme.typography.textPreset4,
          color: theme.palette.grey[500],
          marginBottom: pxToRem(16),
        }}>
        Add money to this pot to achieve your saving goals.
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
            New Amount
          </Typography>
          <Typography
            sx={{
              typography: theme.typography.textPreset2,
              color: theme.palette.grey[900],
            }}>
            ${newTotal.toFixed(2)}
          </Typography>
        </Box>
        <Box
          sx={{
            position: "relative",
            height: pxToRem(8),
            borderRadius: pxToRem(4),
          }}>
          {/* Barra del totale attuale (nero) */}
          <LinearProgress
            variant="determinate"
            value={currentPercentage} // Percentuale attuale
            sx={{
              height: pxToRem(8),
              borderRadius: `${pxToRem(4)} ${pxToRem(4)} ${pxToRem(
                4
              )} ${pxToRem(4)}`,
              backgroundColor: theme.palette.beige[100],
              "& .MuiLinearProgress-bar": {
                backgroundColor: "black", // Colore del totale attuale
                borderRadius: `${pxToRem(4)} ${pxToRem(0)} ${pxToRem(
                  0
                )} ${pxToRem(4)}`,
              },
            }}
          />
          {/* Barra dell'incremento (verde o colore del tema) */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: `${currentPercentage}%`, // La barra parte dalla fine della precedente
              width: `calc(${Math.min(
                addedPercentage,
                100 - currentPercentage
              )}% + ${pxToRem(2)})`, // Mostra solo l'incremento
              height: "100%",
              borderRadius: `${pxToRem(0)} ${pxToRem(4)} ${pxToRem(
                4
              )} ${pxToRem(0)}`,
              marginLeft: pxToRem(2),
              backgroundColor: color, // Colore del pot
            }}
          />
        </Box>
        {/* Percentuale e Target */}
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
            {`${Math.min(currentPercentage + addedPercentage, 100).toFixed(
              2
            )}%`}
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
        label="Amount to Add"
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
        Confirm Addition
      </ButtonPrimary>
    </Box>
  );
};

ModalAddMoney.propTypes = {
  data: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ModalAddMoney;
