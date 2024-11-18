import React from "react";
import { Box, Typography } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import InfoCard from "@components/card/InfoCard";
import SectionHeaderCard from "@components/card/SectionHeaderCard";
import { ReactComponent as PotIcon } from "@assets/images/icon-pot.svg";
import { useMenu } from "@context/MenuContext";

const PotsOverview = () => {
  const theme = useTheme();
  const { setActiveMenu } = useMenu();

  const potsData = [
    {
      label: "Savings",
      value: "$159",
      color: theme.palette.secondaryColors.green,
    },
    { label: "Gift", value: "$40", color: theme.palette.secondaryColors.cyan },
    {
      label: "Concert Ticket",
      value: "$110",
      color: theme.palette.secondaryColors.navy,
    },
    {
      label: "New Laptop",
      value: "$10",
      color: theme.palette.secondaryColors.yellow,
    },
  ];

  const totalSaved = "$850";

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.otherColors.white,
        borderRadius: pxToRem(12),
        padding: pxToRem(24),
      }}>
      <SectionHeaderCard
        title="Pots"
        buttonLabel="See Details"
        onButtonClick={() => setActiveMenu(4)}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row", md: "row" },
          gap: pxToRem(20),
        }}>
        {/* Total Saved */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: theme.palette.beige[100],
            padding: pxToRem(16),
            gap: pxToRem(16),
            maxWidth: {
              xs: "100%",
              sm: pxToRem(247),
              md: pxToRem(247),
            },
            width: "100%",
            borderRadius: pxToRem(12),
          }}>
          <Box
            sx={{
              width: pxToRem(40),
              height: pxToRem(40),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Box>
              <PotIcon />
            </Box>
          </Box>
          <Box>
            <Typography
              sx={{
                typography: "textPreset4",
                color: theme.palette.grey[500],
                marginBottom: pxToRem(11),
              }}>
              Total Saved
            </Typography>
            <Typography
              sx={{
                typography: "textPreset1",
                color: theme.palette.grey[900],
              }}>
              {totalSaved}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            width: "100%",
            gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr" },
            gap: pxToRem(16),
          }}>
          {potsData.map((pot, index) => (
            <InfoCard
              key={index}
              label={pot.label}
              value={pot.value}
              color={pot.color}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PotsOverview;
