import React from "react";
import { Box } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import StatCard from "@components/card/StatCard";

const OverviewContent = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          minHeight: pxToRem(56),
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: pxToRem(32),
        }}>
        <Box
          sx={{
            typography: "textPreset1",
            color: theme.palette.grey[900],
          }}>
          Overview
        </Box>
      </Box>
      {/* StatCards */}
      <Box
        sx={{
          display: "flex",
          gap: { xs: pxToRem(12), sm: pxToRem(24), md: pxToRem(24) },
          flexDirection: { xs: "column", sm: "row", md: "row" },
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
    </>
  );
};

export default OverviewContent;
