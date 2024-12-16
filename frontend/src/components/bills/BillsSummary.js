import React from "react";
import { Box, Typography } from "@mui/material";
import SectionHeaderCard from "@components/card/SectionHeaderCard";

const BillsSummary = ({
  paidCount,
  paidAmount,
  upcomingCount,
  upcomingAmount,
  dueSoonCount,
  dueSoonAmount,
}) => {
  return (
    <Box
      className="Summary-bills"
      sx={{
        width: "100%",
        borderRadius: "12px",
        padding: "20px",
        backgroundColor: "white",
      }}>
      <SectionHeaderCard
        fullWidth
        title="Summary"
        titleTypography="textPreset3"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "16px",
            borderBottom: "1px solid rgba(105, 104, 104, 0.15)",
          }}>
          <Typography
            sx={{
              typography: "textPreset5",
              color: "text.secondary",
            }}>
            Paid Bills
          </Typography>
          <Typography sx={{ typography: "textPreset5Bold" }}>
            {paidCount} (${paidAmount.toFixed(2)})
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "16px",
            borderBottom: "1px solid rgba(105, 104, 104, 0.15)",
          }}>
          <Typography
            sx={{
              typography: "textPreset5",
              color: "text.secondary",
            }}>
            Total Upcoming
          </Typography>
          <Typography sx={{ typography: "textPreset5Bold" }}>
            {upcomingCount} (${upcomingAmount.toFixed(2)})
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography
            sx={{
              typography: "textPreset5",
              color: "secondaryColors.red",
            }}>
            Due Soon
          </Typography>
          <Typography
            sx={{
              typography: "textPreset5Bold",
              color: "secondaryColors.red",
            }}>
            {dueSoonCount} (${dueSoonAmount.toFixed(2)})
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BillsSummary;
