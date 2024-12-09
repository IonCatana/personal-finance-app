import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import { hexToRgba } from "@utils/hexToRgba";
import { useTheme } from "@mui/material/styles";
import { format } from "date-fns";
import SectionHeaderCard from "@components/card/SectionHeaderCard";
import { useMenu } from "@context/MenuContext";

const BudgetDetails = ({
  spentAmount,
  remaining,
  transactions,
  color,
  showSpentSection = true,
  backgroundColor,
  maxTransactionsToShow = 3,
  headerTitle = "Latest Spending",
  headerButtonLabel = "See All",
  sx = {},
}) => {
  const theme = useTheme();
  const { setActiveMenu } = useMenu();

  const latestTransactions = transactions.slice(0, maxTransactionsToShow);

  return (
    <>
      {showSpentSection && (
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
      )}
      <Box
        sx={{
          backgroundColor: backgroundColor || theme.palette.beige[100],
          borderRadius: pxToRem(12),
          padding: { xs: pxToRem(16), sm: pxToRem(20) },
          ...sx,
        }}>
        <SectionHeaderCard
          title={headerTitle}
          titleTypography="textPreset3"
          buttonLabel={headerButtonLabel}
          onButtonClick={() => setActiveMenu(2)}
        />
        {latestTransactions.length > 0 ? (
          latestTransactions.map((transaction, index) => (
            <Box
              key={transaction._id}
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
                    src={transaction.avatar}
                    alt="picusm"
                  />
                </Box>
                <Typography
                  className="company"
                  sx={{
                    typography: "textPreset5Bold",
                    color: theme.palette.grey[900],
                  }}>
                  {transaction.name || "Unknown Company"}
                </Typography>
              </Box>
              <Box>
                <Typography
                  className="amount"
                  sx={{
                    typography: "textPreset5Bold",
                    color:
                      transaction.amount >= 0
                        ? theme.palette.secondaryColors.green
                        : theme.palette.secondaryColors.red,
                    marginBottom: pxToRem(4),
                    textAlign: "right",
                  }}>
                  ${transaction.amount.toFixed(2)}
                </Typography>
                <Typography
                  className="date"
                  sx={{
                    typography: "textPreset5",
                    color: theme.palette.grey[500],
                    textAlign: "right",
                  }}>
                  {format(new Date(transaction.date), "dd MMM yyyy")}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography
            sx={{
              typography: "textPreset4",
              color: theme.palette.grey[500],
              textAlign: "center",
              marginTop: pxToRem(20),
            }}>
            No transactions available.
          </Typography>
        )}
      </Box>
    </>
  );
};

BudgetDetails.propTypes = {
  spentAmount: PropTypes.number,
  remaining: PropTypes.number,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  color: PropTypes.string.isRequired,
  showSpentSection: PropTypes.bool,
  backgroundColor: PropTypes.string,
  headerTitle: PropTypes.string,
  headerButtonLabel: PropTypes.string,
  sx: PropTypes.object,
};

export default BudgetDetails;
