import React from "react";
import { Box } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import StatCard from "@components/card/StatCard";
import PotsOverview from "@components/pots/PotsOverview";
import SectionHeaderContent from "@components/headers/SectionHeaderContent";
import SectionHeaderCard from "@components/card/SectionHeaderCard";
import { useMenu } from "@context/MenuContext";

const OverviewContent = () => {
  const theme = useTheme();
  const { setActiveMenu } = useMenu();

  const userToken = localStorage.getItem("token");
  return (
    <Box>
      <SectionHeaderContent title="Overview" />
      {/* StatCards */}
      <Box
        sx={{
          display: "flex",
          gap: { xs: pxToRem(12), sm: pxToRem(24), md: pxToRem(24) },
          flexWrap: { xs: "wrap", sm: "nowrap", md: "nowrap" },
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
      {/* PotsOverview */}
      <Box
        className="columns"
        sx={{
          display: "flex",
          gap: pxToRem(24),
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "column",
            lg: "row",
          },
        }}>
        <Box
          className="column-left"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: { xs: pxToRem(16), sm: pxToRem(24), md: pxToRem(24) },
          }}>
          <PotsOverview token={userToken} />
        </Box>
        <Box
          className="column-right"
          sx={{
            maxWidth: { xs: "100%", sm: "100%", md: pxToRem(428) },
            width: "100%",
            border: `1px solid ${theme.palette.grey[900]}`,
          }}>
          <SectionHeaderCard
            title="Budgets"
            buttonLabel="See Details"
            onButtonClick={() => setActiveMenu(3)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OverviewContent;
