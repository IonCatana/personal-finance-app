import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
} from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import TransactionRow from "./TransactionRow";
import { useTheme } from "@mui/material/styles";

const TransactionTable = ({
  transactions,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const theme = useTheme();

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transaction) => (
                <TransactionRow
                  key={transaction._id}
                  transaction={transaction}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TransactionTable;
