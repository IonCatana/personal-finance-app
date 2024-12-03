import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import BudgetHeader from "@components/budget/BudgetHeader";
import BudgetProgressBar from "@components/budget/BudgetProgressBar";
import BudgetDetails from "@components/budget/BudgetDetails";

const BudgetsInfoCard = ({
  _id,
  category,
  maximum,
  spentAmount,
  color,
  onUpdate,
  onDelete,
}) => {
  const remaining = Math.max(0, (maximum || 0) - (spentAmount || 0));
  const percentage = maximum ? Math.min(100, (spentAmount / maximum) * 100) : 0;

  return (
    <Box
      sx={{
        backgroundColor: "#fff", // Adatta al tuo tema
        borderRadius: pxToRem(12),
        padding: { xs: `${pxToRem(24)} ${pxToRem(20)}`, sm: pxToRem(32) },
        display: "flex",
        flexDirection: "column",
      }}>
      <BudgetHeader
        category={category}
        maximum={maximum}
        color={color}
        onEdit={() => onUpdate({ _id, category, maximum, spentAmount, color })}
        onDelete={() => onDelete(_id)}
      />
      <BudgetProgressBar percentage={percentage} color={color} />
      <BudgetDetails
        spentAmount={spentAmount}
        remaining={remaining}
        color={color}
      />
    </Box>
  );
};

BudgetsInfoCard.propTypes = {
  _id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  maximum: PropTypes.number,
  spentAmount: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BudgetsInfoCard;
