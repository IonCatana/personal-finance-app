import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import StatCard from "@components/card/StatCard";
import PotsOverview from "@components/pots/PotsOverview";
import BudgetsOverview from "@components/budget/BudgetsOverview";
import SectionHeaderContent from "@components/headers/SectionHeaderContent";
import BudgetDetails from "@components/budget/BudgetDetails";
import BillsOverview from "@components/bills/BillsOverview";
import { getOverview } from "@components/overview/apiOverview";

const OverviewContent = () => {
  const theme = useTheme();

  // Stati
  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Effetto per fetching dei dati
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getOverview();
        setOverviewData(data);
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
            overviewData?.balance?.current
              ? new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(overviewData.balance.current)
              : "0.00"
          }`}
        />
        <StatCard
          title="Income"
          value={`$${
            overviewData?.balance?.income
              ? new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(overviewData.balance.income)
              : "0.00"
          }`}
        />
        <StatCard
          title="Expenses"
          value={`$${
            overviewData?.balance?.expenses
              ? new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(overviewData.balance.expenses)
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
          <PotsOverview
            items={overviewData?.potsOverview?.items || []}
            totalSaved={overviewData?.potsOverview?.totalSaved || 0}
          />
          {overviewData?.transactionsOverview?.category && (
            <BudgetDetails
              sx={{
                padding: {
                  xs: `${pxToRem(24)} ${pxToRem(20)}`,
                  sm: pxToRem(32),
                },
              }}
              showSpentSection={false}
              transactions={overviewData.transactionsOverview.items || []}
              color={
                overviewData.transactionsOverview.color ||
                theme.palette.grey[300]
              }
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
          <BudgetsOverview
            items={overviewData?.budgetsOverview?.items || []}
            chartData={overviewData?.budgetsOverview?.chartData}
            totalSpent={overviewData?.budgetsOverview?.totalSpent || 0}
            totalLimit={overviewData?.budgetsOverview?.totalLimit || 0}
          />
          {overviewData?.billsOverview && (
            <BillsOverview
              paidAmount={overviewData.billsOverview.paidAmount}
              upcomingAmount={overviewData.billsOverview.upcomingAmount}
              dueSoonAmount={overviewData.billsOverview.dueSoonAmount}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default OverviewContent;
