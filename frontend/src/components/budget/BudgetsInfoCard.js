import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, CircularProgress } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import BudgetHeader from "@components/budget/BudgetHeader";
import BudgetProgressBar from "@components/budget/BudgetProgressBar";
import BudgetDetails from "@components/budget/BudgetDetails";
import { fetchTransactionsByCategory } from "@components/transactions/apiTransactions";
import { useTheme } from "@mui/material/styles";

const BudgetsInfoCard = ({
  _id,
  category,
  maximum,
  color,
  onUpdate,
  onDelete,
}) => {
  const theme = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [spentAmount, setSpentAmount] = useState(0);

  const remaining = Math.max(0, (maximum || 0) - (spentAmount || 0));
  const percentage = maximum ? Math.min(100, (spentAmount / maximum) * 100) : 0;
  const [loading, setLoading] = React.useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const getTransactions = async () => {
      setLoading(true);
      try {
        const data = await fetchTransactionsByCategory(category);
        setTransactions(data);
        const totalSpent = data.reduce(
          (sum, transaction) => sum + transaction.amount, // Mantieni il segno
          0
        );
        setSpentAmount(Math.abs(totalSpent));
        setError(null);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, [category]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}>
        <CircularProgress
          style={{
            color: theme.palette.secondaryColors.green,
          }}
        />
      </Box>
    );
  }

  if (error) {
    return <Box>Error: {error}</Box>;
  }

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.otherColors.white,
        borderRadius: pxToRem(12),
        padding: { xs: `${pxToRem(24)} ${pxToRem(20)}`, sm: pxToRem(32) },
        display: "flex",
        flexDirection: "column",
      }}>
      <BudgetHeader
        _id={_id}
        category={category}
        maximum={maximum}
        color={color}
        onEdit={() => onUpdate({ _id, category, maximum, spentAmount, color })}
        onDelete={() => onDelete(_id)}
      />
      <BudgetProgressBar percentage={percentage} color={color} />
      <BudgetDetails
        spentAmount={Math.abs(spentAmount)}
        remaining={remaining}
        transactions={transactions}
        color={color}
      />
    </Box>
  );
};

BudgetsInfoCard.propTypes = {
  _id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  maximum: PropTypes.number,
  color: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BudgetsInfoCard;
