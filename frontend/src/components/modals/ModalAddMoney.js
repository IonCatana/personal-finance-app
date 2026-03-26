import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, LinearProgress } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import BasicInput from "@components/inputFields/BasicInput";
import { useTheme } from "@mui/material/styles";

const ModalAddMoney = ({ data, balanceSummary, onSubmit, onCancel }) => {
  const theme = useTheme();
  const [amount, setAmount] = useState("");

  const { total, target } = data;
  const currentPercentage = (total / target) * 100;
  const addedPercentage = ((parseFloat(amount) || 0) / target) * 100;
  const newTotal = total + (parseFloat(amount) || 0);
  const availableToAllocate = Math.max(Number(balanceSummary?.current) || 0, 0);
  const maxAmount = Math.max(
    Math.min(target - total, availableToAllocate),
    0
  );

  const handleAmountChange = (e) => {
    let value = parseFloat(e.target.value) || 0;

    if (value > maxAmount) {
      value = maxAmount;
    }

    setAmount(value.toString());
  };

  const handleSubmit = () => {
    const parsedAmount = parseFloat(amount);

    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid amount to add.");
      return;
    }

    if (maxAmount <= 0) {
      alert("There is no available current balance to add money right now.");
      return;
    }

    if (parsedAmount > maxAmount) {
      alert(`You can add up to $${maxAmount.toFixed(2)}.`);
      return;
    }

    onSubmit({ ...data, total: total + parsedAmount });
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
          <LinearProgress
            variant="determinate"
            value={currentPercentage}
            sx={{
              height: pxToRem(8),
              borderRadius: `${pxToRem(4)} ${pxToRem(4)} ${pxToRem(
                4
              )} ${pxToRem(4)}`,
              backgroundColor: theme.palette.beige[100],
              "& .MuiLinearProgress-bar": {
                backgroundColor: "black",
                borderRadius: `${pxToRem(4)} ${pxToRem(0)} ${pxToRem(
                  0
                )} ${pxToRem(4)}`,
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: `${currentPercentage}%`,
              width: `calc(${Math.min(
                addedPercentage,
                100 - currentPercentage
              )}% + ${pxToRem(2)})`,
              height: "100%",
              borderRadius: `${pxToRem(0)} ${pxToRem(4)} ${pxToRem(
                4
              )} ${pxToRem(0)}`,
              marginLeft: pxToRem(2),
              backgroundColor: theme.palette.secondaryColors.green,
            }}
          />
        </Box>
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
      <BasicInput
        fullWidth
        label="Amount to Add"
        type="number"
        prefix="$"
        value={amount}
        onChange={handleAmountChange}
        placeholder="e.g. 100"
        error={maxAmount === 0}
        errorText="No available current balance to allocate."
        infoText={`Available to move: $${maxAmount.toFixed(2)}`}
        sx={{
          marginBottom: pxToRem(20),
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
      <ButtonPrimary fullWidth onClick={handleSubmit}>
        Confirm Addition
      </ButtonPrimary>
    </Box>
  );
};

ModalAddMoney.propTypes = {
  data: PropTypes.object.isRequired,
  balanceSummary: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ModalAddMoney;
