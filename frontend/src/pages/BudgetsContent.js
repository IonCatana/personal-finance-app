import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import SectionHeaderContent from "@components/headers/SectionHeaderContent";
import ChartBudget from "@components/budget/ChartBudget";
import SectionHeaderCard from "@components/card/SectionHeaderCard";
import { useBudgetsData } from "@hooks/useBudgetsData";
import BudgetCard from "@components/budget/BudgetCard";

const BudgetsContent = () => {
  const theme = useTheme();

  const { chartData, totalSpent, totalLimit, budgets, loading } =
    useBudgetsData();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <SectionHeaderContent
        title="Budgets"
        buttonLabel="+ Add New Budget"
        onButtonClick={() => console.log("Add New Budget clicked!")}
        buttonComponent={ButtonPrimary}
      />
      <Box
        className="budgets-content"
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "column",
            lg: "row",
          },
          gap: pxToRem(24),
          justifyContent: "space-between",
        }}>
        <Box
          className="left"
          sx={{
            maxWidth: { xs: "100%", sm: "100%", md: "100%", lg: pxToRem(428) },
            width: "100%",
            backgroundColor: theme.palette.otherColors.white,
            borderRadius: pxToRem(12),
            padding: {
              xs: `${pxToRem(24)} ${pxToRem(20)}`,
              sm: `${pxToRem(32)} ${pxToRem(32)} ${pxToRem(24)} ${pxToRem(32)}`,
              md: `${pxToRem(32)} ${pxToRem(32)} ${pxToRem(24)} ${pxToRem(32)}`,
            },
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
                md: "row",
                lg: "column",
              },
              alignItems: "center",
              gap: pxToRem(32),
              justifyContent: "space-between",
            }}>
            <ChartBudget
              chartData={chartData}
              totalSpent={totalSpent}
              totalLimit={totalLimit}
            />
            {/* Lista dettagli dei budget */}
            <Box
              sx={{
                width: "100%",
              }}>
              <SectionHeaderCard fullWidth title="Spending Summary" />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  "& > :last-child": {
                    borderBottom: "none",
                    paddingBottom: 0,
                  },
                  "& > :first-child": {
                    paddingTop: pxToRem(4),
                  },
                }}>
                {budgets.map((budget) => (
                  <BudgetCard
                    key={budget._id}
                    category={budget.category}
                    spentAmount={budget.spentAmount}
                    maximum={budget.maximum}
                    color={budget.color || "#E0E0E0"}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          className="right"
          sx={{
            flex: 1,
          }}>
          right
        </Box>
      </Box>
    </>
  );
};

export default BudgetsContent;
