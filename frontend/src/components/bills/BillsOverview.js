import React from "react";
import { Box, Typography } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import { useMenu } from "@context/MenuContext";
import SectionHeaderCard from "@components/card/SectionHeaderCard";

const BillsOverview = ({ paidAmount, upcomingAmount, dueSoonAmount }) => {
  const theme = useTheme();
  const { setActiveMenu } = useMenu();
  const billsData = [
    { title: "Paid Bills", amount: paidAmount, color: "#277C78" },
    { title: "Total Upcoming", amount: upcomingAmount, color: "#F2CDAC" },
    { title: "Due Soon", amount: dueSoonAmount, color: "#82C9D7" },
  ];

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
        title="Recurring Bills"
        buttonLabel="See Details"
        onButtonClick={() => setActiveMenu(5)}
        sx={{ marginBottom: pxToRem(32) }}
      />
      {billsData.map((bill, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: `${pxToRem(20)} ${pxToRem(16)}`,
            backgroundColor: theme.palette.beige[100],
            marginBottom: index !== billsData.length - 1 ? pxToRem(12) : 0,
            borderRadius: pxToRem(8),
            borderLeft: `${pxToRem(4)} solid ${bill.color}`,
          }}>
          <Typography
            sx={{
              color: "text.secondary",
              typography: "textPreset4",
            }}>
            {bill.title}
          </Typography>
          <Typography sx={{ typography: "textPreset4Bold" }}>
            ${bill.amount.toFixed(2)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default BillsOverview;
