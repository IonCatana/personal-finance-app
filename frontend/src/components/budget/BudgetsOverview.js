import React from "react";
import { Box } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import SectionHeaderCard from "@components/card/SectionHeaderCard";
import PotsInfoCard from "@components/pots/PotsInfoCard";
import ChartBudget from "@components/budget/ChartBudget";
import { useMenu } from "@context/MenuContext";

const BudgetsOverview = ({
  items = [],
  chartData = { labels: [], datasets: [{ data: [], backgroundColor: [] }] },
  totalSpent = 0,
  totalLimit = 0,
}) => {
  const theme = useTheme();
  const { setActiveMenu } = useMenu();
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
          totalSpent={Math.abs(totalSpent)}
          totalLimit={Math.abs(totalLimit)}
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
          {items.map((budget) => (
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
