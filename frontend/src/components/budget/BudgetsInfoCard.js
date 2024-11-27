import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, LinearProgress } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import { ReactComponent as EllipsisIcon } from "@assets/images/icon-ellipsis.svg";
import ActionPopover from "@components/actions/ActionPopover";
import { updateBudget, deleteBudget } from "@components/budget/apiBudgets";

const BudgetsInfoCard = ({
  _id,
  category,
  maximum,
  spentAmount,
  color,
  onUpdate,
  onDelete,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const remaining = maximum - spentAmount;
  const percentage = (spentAmount / maximum) * 100;

  const handlePopover = (event) =>
    setAnchorEl(event ? event.currentTarget : null);

  const handleEdit = async () => {
    // Simulazione modifica budget
    const updatedBudget = {
      _id,
      category,
      maximum: maximum + 10,
      spentAmount,
      color,
    };
    await onUpdate(updatedBudget);
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    await onDelete(_id);
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.otherColors.white,
        borderRadius: pxToRem(12),
        padding: {
          xs: `${pxToRem(24)} ${pxToRem(20)}`,
          sm: `${pxToRem(32)} ${pxToRem(32)}`,
        },
        display: "flex",
        flexDirection: "column",
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: pxToRem(20),
        }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: pxToRem(8) }}>
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
            {category}
          </Typography>
        </Box>
        <EllipsisIcon
          onClick={handlePopover}
          style={{ minHeight: pxToRem(24), cursor: "pointer" }}
        />
        <ActionPopover
          actions={[
            { label: "Edit Budget", onClick: handleEdit },
            {
              label: "Delete Budget",
              onClick: handleDelete,
              color: theme.palette.secondaryColors.red,
            },
          ]}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
        />
      </Box>
      <Box>
        <Typography>Total Spent: ${spentAmount.toFixed(2)}</Typography>
        <Typography>Remaining: ${remaining.toFixed(2)}</Typography>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            backgroundColor: theme.palette.grey[200],
            "& .MuiLinearProgress-bar": { backgroundColor: color },
          }}
        />
      </Box>
    </Box>
  );
};

BudgetsInfoCard.propTypes = {
  _id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  maximum: PropTypes.number.isRequired,
  spentAmount: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BudgetsInfoCard;
