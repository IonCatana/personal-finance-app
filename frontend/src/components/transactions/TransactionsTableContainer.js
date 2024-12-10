import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import TransactionRow from "@components/transactions/TransactionRow";
import { useTheme } from "@mui/material/styles";

/**
 * TransactionsTableContainer
 *
 * Questo componente è una variante generica della tabella di transazioni.
 * Permette di mostrare/nascondere colonne specifiche tramite props booleane.
 *
 * Props:
 * - transactions (array) Obbligatorio
 * - page (number) Obbligatorio
 * - rowsPerPage (number) Obbligatorio
 * - handleChangePage (function) Obbligatorio
 * - handleChangeRowsPerPage (function) Opzionale
 * - hideRecipient (boolean) Default: false
 * - hideCategory (boolean) Default: false
 * - hideDate (boolean) Default: false
 * - hideAmount (boolean) Default: false
 *
 * Esempio d'uso:
 * <TransactionsTableContainer
 *   transactions={transactions}
 *   page={page}
 *   rowsPerPage={rowsPerPage}
 *   handleChangePage={handleChangePage}
 *   handleChangeRowsPerPage={handleChangeRowsPerPage}
 *   hideCategory={true}
 * />
 */

const TransactionsTableContainer = ({
  transactions,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  hideRecipient = false,
  hideCategory = false,
  hideDate = false,
  hideAmount = false,
}) => {
  const theme = useTheme();

  return (
    <>
      <TableContainer
        sx={{
          marginBottom: pxToRem(32),
        }}>
        <Table>
          <TableHead>
            <TableRow>
              {!hideRecipient && (
                <TableCell
                  sx={{
                    padding: 0,
                    display: { xs: "none", sm: "table-cell" },
                  }}>
                  <Typography
                    sx={{
                      fontSize: pxToRem(12),
                      color: theme.palette.grey[500],
                      padding: {
                        xs: `${pxToRem(16)} ${pxToRem(16)} ${pxToRem(
                          16
                        )} ${pxToRem(0)}`,
                        sm: `${pxToRem(21)} ${pxToRem(16)} ${pxToRem(
                          21
                        )} ${pxToRem(0)}`,
                        md: `${pxToRem(21)} ${pxToRem(16)}`,
                      },
                    }}>
                    Recipient / Sender
                  </Typography>
                </TableCell>
              )}
              {!hideCategory && (
                <TableCell
                  sx={{
                    padding: 0,
                    display: { xs: "none", sm: "table-cell" },
                  }}>
                  <Typography
                    sx={{
                      fontSize: pxToRem(12),
                      color: theme.palette.grey[500],
                      padding: {
                        xs: `${pxToRem(16)} ${pxToRem(16)} ${pxToRem(
                          16
                        )} ${pxToRem(0)}`,
                        sm: `${pxToRem(21)} ${pxToRem(16)}`,
                        md: `${pxToRem(21)} ${pxToRem(16)}`,
                      },
                    }}>
                    Category
                  </Typography>
                </TableCell>
              )}
              {!hideDate && (
                <TableCell
                  sx={{
                    padding: 0,
                    display: { xs: "none", sm: "table-cell" },
                  }}>
                  <Typography
                    sx={{
                      fontSize: pxToRem(12),
                      color: theme.palette.grey[500],
                      padding: {
                        xs: `${pxToRem(16)} ${pxToRem(16)} ${pxToRem(
                          16
                        )} ${pxToRem(0)}`,
                        sm: `${pxToRem(21)} ${pxToRem(16)}`,
                        md: `${pxToRem(21)} ${pxToRem(16)}`,
                      },
                    }}>
                    Transaction Date
                  </Typography>
                </TableCell>
              )}
              {!hideAmount && (
                <TableCell
                  sx={{
                    padding: 0,
                    display: { xs: "none", sm: "table-cell" },
                    textAlign: "right",
                  }}>
                  <Typography
                    sx={{
                      fontSize: pxToRem(12),
                      color: theme.palette.grey[500],
                      padding: {
                        xs: `${pxToRem(16)} ${pxToRem(0)} ${pxToRem(
                          16
                        )} ${pxToRem(16)}`,
                        sm: `${pxToRem(21)} ${pxToRem(0)} ${pxToRem(
                          21
                        )} ${pxToRem(16)}`,
                        md: `${pxToRem(21)} ${pxToRem(16)} ${pxToRem(
                          21
                        )} ${pxToRem(16)}`,
                      },
                    }}>
                    Amount
                  </Typography>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(transactions) && transactions.length > 0 ? (
              transactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction) => (
                  <TransactionRow
                    key={transaction._id}
                    transaction={transaction}
                    hideRecipient={hideRecipient}
                    hideCategory={hideCategory}
                    hideDate={hideDate}
                    hideAmount={hideAmount}
                  />
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography>No transactions found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TransactionsTableContainer;
