import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { hexToRgba } from "@utils/hexToRgba";
import { useTheme } from "@mui/material/styles";
import SectionHeaderCard from "@components/card/SectionHeaderCard";
import { useMenu } from "@context/MenuContext";

const BudgetDetails = ({ spentAmount, remaining, color }) => {
  const theme = useTheme();
  const { setActiveMenu } = useMenu();

  return (
    <>
      <Box
        sx={{
          display: { xs: "grid", sm: "flex" },
          gridTemplateColumns: "repeat(2 ,1fr)",
          justifyContent: "space-between",
          gap: pxToRem(12),
          width: "100%",
          marginBottom: pxToRem(20),
        }}>
        <Box
          sx={{
            flex: 1,
            paddingLeft: pxToRem(20),
            position: "relative",
            "&:after": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 0,
              width: pxToRem(4),
              borderRadius: `${pxToRem(8)}`,
              height: "100%",
              backgroundColor: color,
            },
          }}>
          <Typography
            sx={{
              typography: "textPreset5",
              color: theme.palette.grey[500],
              marginBottom: pxToRem(4),
            }}>
            Spent
          </Typography>
          <Typography
            sx={{
              typography: "textPreset4Bold",
              color: theme.palette.grey[900],
            }}>
            ${spentAmount.toFixed(2)}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            paddingLeft: pxToRem(20),
            position: "relative",
            "&:after": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 0,
              width: pxToRem(4),
              borderRadius: `${pxToRem(8)}`,
              height: "100%",
              backgroundColor: theme.palette.beige[100],
            },
          }}>
          <Typography
            sx={{
              typography: "textPreset5",
              color: theme.palette.grey[500],
              marginBottom: pxToRem(4),
            }}>
            Remaining
          </Typography>
          <Typography
            sx={{
              typography: "textPreset4Bold",
              color: theme.palette.grey[900],
            }}>
            ${remaining.toFixed(2)}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.beige[100],
          borderRadius: pxToRem(12),
          padding: { xs: pxToRem(16), sm: pxToRem(20) },
        }}>
        <SectionHeaderCard
          title="Latest Spending"
          titleTypography="textPreset3"
          buttonLabel="See All"
          onButtonClick={() => setActiveMenu(2)}
        />
        {[...Array(3)].map((_, index) => (
          <Box
            key={index}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: `${pxToRem(16)} 0`,
              borderBottom: `1px solid ${hexToRgba(
                theme.palette.grey[500],
                0.15
              )}`,
              ...(index === 0 && {
                paddingTop: 0,
              }),
              "&:last-child": {
                borderBottom: "none",
                paddingBottom: 0,
              },
            }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: pxToRem(16),
              }}>
              <Box
                className="avatar-company"
                sx={{
                  width: pxToRem(32),
                  height: pxToRem(32),
                  borderRadius: "50%",
                  backgroundColor: theme.palette.grey[900],
                  overflow: "hidden",
                }}>
                <img
                  width="32"
                  height="32"
                  src="https://picsum.photos/200/300"
                  alt="picusm"
                />
              </Box>
              <Typography
                className="company"
                sx={{
                  typography: "textPreset5Bold",
                  color: theme.palette.grey[900],
                }}>
                Company {index + 1}
              </Typography>
            </Box>
            <Box>
              <Typography
                className="amount"
                sx={{
                  typography: "textPreset5Bold",
                  color: theme.palette.grey[900],
                  marginBottom: pxToRem(4),
                  textAlign: "right",
                }}>
                -$23.99
              </Typography>
              <Typography
                className="date"
                sx={{
                  typography: "textPreset5",
                  color: theme.palette.grey[500],
                  textAlign: "right",
                }}>
                12th August
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

BudgetDetails.propTypes = {
  spentAmount: PropTypes.number.isRequired,
  remaining: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default BudgetDetails;
