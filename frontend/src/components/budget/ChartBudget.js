import React, { useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartBudget = ({ chartData, totalSpent, totalLimit }) => {
  const theme = useTheme();
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [chartData]);

  return (
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
          justifyContent: "center",
        }}>
        <Doughnut
          ref={chartRef}
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
            ${totalSpent.toFixed(2)}
          </Typography>
          <Typography
            sx={{
              typography: "textPreset5",
              color: theme.palette.grey[500],
            }}>
            of ${totalLimit.toFixed(2)} limit
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
  );
};

export default ChartBudget;
