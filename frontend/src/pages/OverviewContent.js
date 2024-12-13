import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import StatCard from "@components/card/StatCard";
import PotsOverview from "@components/pots/PotsOverview";
import BudgetsOverview from "@components/budget/BudgetsOverview";
import SectionHeaderContent from "@components/headers/SectionHeaderContent";
import BudgetDetails from "@components/budget/BudgetDetails";
import { getBudgets } from "@components/budget/apiBudgets";
import { fetchTransactionsByCategory } from "@components/transactions/apiTransactions";

const OverviewContent = (
  showSpentSection = false,
  backgroundColor,
  maxTransactionsToShow,
  sx = {}
) => {
  const theme = useTheme();

  const [budget, setBudget] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const budgets = await getBudgets();
        if (budgets.length > 0) {
          const selectedBudget = budgets[0];
          setBudget(selectedBudget);

          const categoryTransactions = await fetchTransactionsByCategory(
            selectedBudget.category
          );
          setTransactions(categoryTransactions);
        }
      } catch (error) {
        console.error("Error fetching budgets or transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          style={{ color: theme.palette.secondaryColors.green }}
        />
      </Box>
    );
  }

  return (
    <Box>
      <SectionHeaderContent
        title="Overview"
        showLogout
        onLogout={() => console.log("Logout eseguito")}
      />
      {/* StatCards */}
      <Box
        sx={{
          display: "flex",
          gap: { xs: pxToRem(12), sm: pxToRem(24), md: pxToRem(24) },
          flexWrap: { xs: "wrap", sm: "nowrap", md: "nowrap" },
          marginBottom: pxToRem(32),
        }}>
        <StatCard
          backgroundColor={theme.palette.grey[900]}
          title="Current Balance"
          value="$4,836.00"
          color={theme.palette.otherColors.white}
        />
        <StatCard title="Income" value="$3,814.25" />
        <StatCard title="Expenses" value="$1,700.50" />
      </Box>
      {/* PotsOverview */}
      <Box
        className="columns"
        sx={{
          display: "flex",
          gap: pxToRem(24),
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "column",
            lg: "row",
          },
        }}>
        <Box
          className="column-left"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: { xs: pxToRem(16), sm: pxToRem(24), md: pxToRem(24) },
          }}>
          <PotsOverview />
          {budget && (
            <BudgetDetails
              sx={{
                padding: {
                  xs: `${pxToRem(24)} ${pxToRem(20)}`,
                  sm: pxToRem(32),
                },
              }}
              showSpentSection={false}
              transactions={transactions}
              color={budget.color || theme.palette.grey[300]}
              backgroundColor={theme.palette.otherColors.white}
              maxTransactionsToShow={5}
              headerTitle="Transactions"
              headerButtonLabel="View All"
            />
          )}
        </Box>
        <Box
          className="column-right"
          sx={{
            maxWidth: { xs: "100%", sm: "100%", md: "100%", lg: pxToRem(428) },
            width: "100%",
          }}>
          <BudgetsOverview />
        </Box>
      </Box>
    </Box>
  );
};

export default OverviewContent;
