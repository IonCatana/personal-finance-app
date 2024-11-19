import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, LinearProgress } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import ButtonSecondary from "@components/buttons/ButtonSecondary";
import { ReactComponent as EllipsisIcon } from "@assets/images/icon-ellipsis.svg";

const PotsCard = ({
  title,
  totalSaved,
  target,
  percentage,
  color,
  onAddMoney,
  onWithdraw,
}) => {
  const theme = useTheme();

  // TODO da ottimizare il codice ancora di piu
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.otherColors.white,
        borderRadius: pxToRem(12),
        padding: pxToRem(24),
        display: "flex",
        flexDirection: "column",
        gap: pxToRem(32),
      }}>
      {/* Header */}
      <Box
        className="pots-card-header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: pxToRem(16),
          }}>
          <Box
            sx={{
              width: pxToRem(16),
              height: pxToRem(16),
              borderRadius: "50%",
              backgroundColor: color,
            }}
          />
          <Typography
            sx={{
              typography: "textPreset2",
              color: theme.palette.grey[900],
            }}>
            {title}
          </Typography>
        </Box>
        <EllipsisIcon
          onClick={() => console.log("Menu ellipsis clicked!")}
          style={{
            minHeight: pxToRem(24),
            cursor: "pointer",
          }}
        />
      </Box>

      {/* Total Saved */}
      <Box
        className="pots-card-total-saved"
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: `${pxToRem(10.5)} ${pxToRem(0)}`,
          gap: pxToRem(16),
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography
            sx={{
              typography: "textPreset4",
              color: theme.palette.grey[500],
            }}>
            Total Saved
          </Typography>
          <Typography
            sx={{
              typography: "textPreset1",
              color: theme.palette.grey[900],
            }}>
            {`$${totalSaved.toFixed(2)}`}
          </Typography>
        </Box>
        {/* Progress Bar */}
        <Box>
          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{
              height: pxToRem(8),
              borderRadius: pxToRem(4),
              backgroundColor: theme.palette.beige[100],
              "& .MuiLinearProgress-bar": {
                backgroundColor: color,
                borderRadius: pxToRem(4),
              },
            }}
          />
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
              {`${percentage.toFixed(1)}%`}
            </Typography>
            <Typography
              sx={{
                typography: "textPreset5",
                color: theme.palette.grey[500],
              }}>
              {`Target of $${target}`}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Buttons */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: pxToRem(16),
        }}>
        <ButtonSecondary
          sx={{
            flex: 1,
          }}
          onClick={() => console.log("Azione Add Money eseguita")}>
          + Add Money
        </ButtonSecondary>
        <ButtonSecondary
          sx={{
            flex: 1,
          }}
          onClick={() => console.log("Azione Withdraw eseguita")}>
          Withdraw
        </ButtonSecondary>
      </Box>
    </Box>
  );
};

PotsCard.propTypes = {
  title: PropTypes.string.isRequired, // Titolo della card (es. "Savings")
  totalSaved: PropTypes.number.isRequired, // Totale risparmiato (es. 159)
  target: PropTypes.number.isRequired, // Target da raggiungere (es. 2000)
  percentage: PropTypes.number.isRequired, // Percentuale raggiunta (es. 7.95)
  color: PropTypes.string.isRequired, // Colore della barra e del pallino
  onAddMoney: PropTypes.func.isRequired, // Funzione chiamata al click su "+ Add Money"
  onWithdraw: PropTypes.func.isRequired, // Funzione chiamata al click su "Withdraw"
};

export default PotsCard;
