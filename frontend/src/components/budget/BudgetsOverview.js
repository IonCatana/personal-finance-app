import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import SectionHeaderCard from "@components/card/SectionHeaderCard";
import PotsInfoCard from "@components/pots/PotsInfoCard";
import ChartBudget from "@components/budget/ChartBudget";
import { useBudgetsData } from "@hooks/useBudgetsData";
import { useMenu } from "@context/MenuContext";
import { getBudgets } from "@components/budget/apiBudgets";

const BudgetsOverview = () => {
  const theme = useTheme();
  const { setActiveMenu } = useMenu();
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { chartData, totalSpent, totalLimit } = useBudgetsData(budgets);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const data = await getBudgets();
        setBudgets(data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
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
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.otherColors.white,
        borderRadius: pxToRem(12),
        padding: {
          xs: `${pxToRem(24)} ${pxToRem(20)}`,
          sm: pxToRem(32),
          md: pxToRem(32),
        },
      }}>
      <SectionHeaderCard
        title="Budgets"
        buttonLabel="See Details"
        onButtonClick={() => setActiveMenu(3)}
      />

      {/* Chart Budget */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
          alignItems: "center",
          gap: { xs: pxToRem(16), md: pxToRem(20), lg: pxToRem(20) },
          justifyContent: "space-between",
          marginTop: pxToRem(20),
          padding: {
            xs: `${pxToRem(0)}`,
            sm: `${pxToRem(32)} ${pxToRem(0)} ${pxToRem(32)} ${pxToRem(0)}`,
            md: `${pxToRem(32)} ${pxToRem(0)} ${pxToRem(32)} ${pxToRem(0)}`,
            lg: `${pxToRem(32)} ${pxToRem(0)} ${pxToRem(32)} ${pxToRem(0)}`,
          },
        }}>
        <ChartBudget
          chartData={chartData}
          totalSpent={totalSpent}
          totalLimit={totalLimit}
        />

        {/* Lista dettagli dei budget */}
        <Box
          sx={{
            display: { xs: "grid", sm: "flex" },
            gridTemplateColumns: "repeat(2 ,1fr)",
            flexDirection: "column",
            gap: pxToRem(12),
            maxWidth: { xs: "100%", sm: pxToRem(100) },
            width: "100%",
          }}>
          {budgets.slice(0, 4).map((budget) => (
            <PotsInfoCard
              key={budget._id}
              name={budget.category}
              total={`$${budget.maximum}`}
              color={budget.color}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BudgetsOverview;
