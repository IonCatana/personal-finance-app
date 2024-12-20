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
import {
  fetchTransactions,
  fetchTransactionsByCategory,
} from "@components/transactions/apiTransactions";
import { calculateBillsSummary } from "@components/bills/apiBills";
import BillsOverview from "@components/bills/BillsOverview";
import { getBalance } from "@components/balance/apiBalance";

const OverviewContent = () => {
  const theme = useTheme();

  // Stati
  const [budget, setBudget] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [billsSummary, setBillsSummary] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  // Effetto per fetching dei dati
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Recupera il bilancio
        const balanceData = await getBalance();
        setBalance(balanceData);

        // Recupera i Budget
        const budgets = await getBudgets();
        if (budgets.length > 0) {
          const selectedBudget = budgets[0];
          setBudget(selectedBudget);

          // Recupera le transazioni per la categoria selezionata
          const categoryTransactions = await fetchTransactionsByCategory(
            selectedBudget.category
          );
          setTransactions(categoryTransactions);
        }

        // Recupera tutte le transazioni per le Bills
        const allTransactions = await fetchTransactions();
        const summary = calculateBillsSummary(allTransactions);
        setBillsSummary(summary);
      } catch (error) {
        console.error("Error fetching data:", error);
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
      <SectionHeaderContent title="Overview" showLogout />
      <Box
        sx={{
          display: "flex",
          gap: { xs: pxToRem(12), sm: pxToRem(24) },
          flexWrap: { xs: "wrap", sm: "nowrap" },
          marginBottom: pxToRem(32),
        }}>
        <StatCard
          backgroundColor={theme.palette.grey[900]}
          color={theme.palette.otherColors.white}
          title="Current Balance"
          value={`$${
            balance?.current
              ? new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(balance.current)
              : "0.00"
          }`}
        />
        <StatCard
          title="Income"
          value={`$${
            balance?.income
              ? new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(balance.income)
              : "0.00"
          }`}
        />
        <StatCard
          title="Expenses"
          value={`$${
            balance?.expenses
              ? new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(balance.expenses)
              : "0.00"
          }`}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: pxToRem(24),
          flexDirection: { xs: "column", lg: "row" },
        }}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: pxToRem(24),
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
            display: "flex",
            flexDirection: "column",
            gap: pxToRem(24),
          }}>
          <BudgetsOverview />
          {billsSummary && (
            <BillsOverview
              paidAmount={billsSummary.paidAmount}
              upcomingAmount={billsSummary.upcomingAmount}
              dueSoonAmount={billsSummary.dueSoonAmount}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default OverviewContent;
