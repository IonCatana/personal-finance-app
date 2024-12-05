import React from "react";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { format } from "date-fns";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

const TransactionRow = ({ transaction }) => {
  const theme = useTheme();

  return (
    <TableRow>
      <TableCell
        sx={{
          padding: {
            xs: `${pxToRem(16)} ${pxToRem(16)} ${pxToRem(16)} ${pxToRem(0)}`,
            sm: `${pxToRem(16)} ${pxToRem(0)}`,
            md: `${pxToRem(16)} ${pxToRem(16)}`,
          },
        }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            // src={transaction.avatar}
            src={`https://picsum.photos/seed/40/40`}
            alt={transaction.name}
            style={{
              width: pxToRem(40),
              height: pxToRem(40),
              borderRadius: "50%",
              marginRight: pxToRem(16),
            }}
          />
          <Box>
            <Typography
              sx={{
                fontSize: pxToRem(14),
                fontWeight: "bold",
                color: theme.palette.grey[900],
              }}>
              {transaction.name}
            </Typography>
            <Typography
              sx={{
                display: { xs: "flex", sm: "none" },
                marginTop: { xs: pxToRem(4) },
                fontSize: pxToRem(12),
                color: theme.palette.grey[500],
              }}>
              {transaction.category}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell
        sx={{
          display: { xs: "none", sm: "table-cell" },
          padding: `${pxToRem(16)} ${pxToRem(16)}`,
          fontSize: pxToRem(12),
          color: theme.palette.grey[500],
        }}>
        {transaction.category}
      </TableCell>
      <TableCell
        sx={{
          display: { xs: "none", sm: "table-cell" },
          padding: `${pxToRem(16)} ${pxToRem(16)}`,
          fontSize: pxToRem(12),
          color: theme.palette.grey[500],
        }}>
        {format(new Date(transaction.date), "dd MMM yyyy")}
      </TableCell>
      <TableCell
        sx={{
          padding: {
            xs: `${pxToRem(16)} ${pxToRem(0)} ${pxToRem(16)} ${pxToRem(16)}`,
            sm: `${pxToRem(16)} ${pxToRem(0)} ${pxToRem(16)} ${pxToRem(16)}`,
            md: `${pxToRem(16)} ${pxToRem(16)}`,
          },
          fontSize: pxToRem(14),
          fontWeight: "bold",
          color:
            transaction.amount >= 0
              ? theme.palette.secondaryColors.green
              : theme.palette.secondaryColors.red,
          textAlign: "right",
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}>
          <Typography
            sx={{
              fontSize: pxToRem(14),
              fontWeight: "bold",
            }}>
            {transaction.amount >= 0 ? "+" : ""}
            {transaction.amount.toFixed(2)} €
          </Typography>
          <Typography
            sx={{
              display: { xs: "flex", sm: "none" },
              marginTop: { xs: pxToRem(4) },
              fontSize: pxToRem(12),
              color: theme.palette.grey[500],
            }}>
            {format(new Date(transaction.date), "dd MMM yyyy")}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TransactionRow;
