import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useMenu } from "@context/MenuContext";
import SectionHeaderCard from "@components/card/SectionHeaderCard";
import PotsInfoCard from "@components/pots/PotsInfoCard";
import { getBudgets } from "@components/budget/apiBudgets";

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetsOverview = () => {
  const theme = useTheme();
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setActiveMenu } = useMenu();

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const data = await getBudgets();
        console.log("Dati budget:", data); // Debug dei dati ricevuti
        setBudgets(data);
      } catch (error) {
        console.error("Errore nel recupero dei budget:", error);
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

  const filteredBudgets = budgets.filter((budget) => budget.spentAmount > 0);

  const chartData = {
    labels: filteredBudgets.map((budget) => budget.category),
    datasets: [
      {
        data: filteredBudgets.map((budget) => budget.spentAmount),
        backgroundColor: filteredBudgets.map(
          (budget) => budget.color || "#E0E0E0"
        ),
        borderWidth: 1,
      },
    ],
  };

  const totalSpent = budgets.reduce(
    (acc, budget) => acc + budget.spentAmount,
    0
  );
  const totalLimit = budgets.reduce((acc, budget) => acc + budget.maximum, 0);

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
        {/* Grafico ad anello */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Box
            sx={{
              maxWidth: pxToRem(240),
              width: "100%",
              height: pxToRem(240),
              position: "relative",
              display: "flex",
              justifuSelf: "center",
            }}>
            <Doughnut
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: "70%",
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                fontSize: pxToRem(20),
                zIndex: 2,
              }}>
              <Typography
                sx={{
                  typography: "textPreset1",
                  color: theme.palette.grey[900],
                  marginBottom: pxToRem(8),
                }}>
                ${totalSpent}
              </Typography>
              <Typography
                sx={{
                  typography: "textPreset5",
                  color: theme.palette.grey[500],
                }}>
                of ${totalLimit} limit
              </Typography>
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: pxToRem(192),
                height: pxToRem(192),
                borderRadius: "50%",
                opacity: 0.2,
                backgroundColor: theme.palette.otherColors.white,
                zIndex: 1,
              }}></Box>
          </Box>
        </Box>

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
              total={`$${budget.maximum.toFixed(2)}`}
              color={budget.color}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BudgetsOverview;
