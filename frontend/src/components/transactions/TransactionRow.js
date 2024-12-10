import React from "react";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { format } from "date-fns";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

/**
 * TransactionRow Component
 *
 * Ora aggiungiamo le props per nascondere le colonne:
 * - hideRecipient (boolean)
 * - hideCategory (boolean)
 * - hideDate (boolean)
 * - hideAmount (boolean)
 */

const TransactionRow = ({
  transaction,
  sx = {},
  hideRecipient = false,
  hideCategory = false,
  hideDate = false,
  hideAmount = false,
}) => {
  const theme = useTheme();

  return (
    <TableRow sx={sx}>
      {/* Recipient / Sender cell */}
      {!hideRecipient && (
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
              src={transaction.avatar}
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
              {!hideCategory && (
                <Typography
                  sx={{
                    display: { xs: "flex", sm: "none" },
                    marginTop: { xs: pxToRem(4) },
                    fontSize: pxToRem(12),
                    color: theme.palette.grey[500],
                  }}>
                  {transaction.category}
                </Typography>
              )}
            </Box>
          </Box>
        </TableCell>
      )}

      {/* Category cell */}
      {!hideCategory && (
        <TableCell
          sx={{
            display: { xs: "none", sm: "table-cell" },
            padding: `${pxToRem(16)} ${pxToRem(16)}`,
            fontSize: pxToRem(12),
            color: theme.palette.grey[500],
          }}>
          {transaction.category}
        </TableCell>
      )}

      {/* Date cell */}
      {!hideDate && (
        <TableCell
          sx={{
            display: { xs: "none", sm: "table-cell" },
            padding: `${pxToRem(16)} ${pxToRem(16)}`,
            fontSize: pxToRem(12),
            color: theme.palette.grey[500],
          }}>
          {format(new Date(transaction.date), "dd MMM yyyy")}
        </TableCell>
      )}

      {/* Amount cell */}
      {!hideAmount && (
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
            {!hideDate && (
              <Typography
                sx={{
                  display: { xs: "flex", sm: "none" },
                  marginTop: { xs: pxToRem(4) },
                  fontSize: pxToRem(12),
                  color: theme.palette.grey[500],
                }}>
                {format(new Date(transaction.date), "dd MMM yyyy")}
              </Typography>
            )}
          </Box>
        </TableCell>
      )}
    </TableRow>
  );
};

export default TransactionRow;
