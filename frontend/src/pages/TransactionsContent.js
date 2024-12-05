import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { format } from "date-fns";
import SectionHeaderContent from "@components/headers/SectionHeaderContent";
import { fetchTransactions } from "@components/transactions/apiTransactions";
import { useTheme } from "@mui/material/styles";
import { pxToRem } from "@utils/pxToRem";

const TransactionsContent = () => {
  const theme = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        setLoading(true);
        const data = await fetchTransactions(); // Recupera tutte le transazioni
        setTransactions(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}>
        <CircularProgress
          style={{
            color: theme.palette.secondaryColors.green,
          }}
        />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">Errore: {error.error || error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <SectionHeaderContent title="Transactions" />
      <Box
        sx={{
          backgroundColor: theme.palette.otherColors.white,
          borderRadius: pxToRem(12),
          padding: { xs: pxToRem(20), sm: pxToRem(32) },
        }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    padding: 0,
                    display: {
                      xs: "none",
                      sm: "table-cell",
                    },
                  }}>
                  <Typography
                    sx={{
                      fontSize: pxToRem(12),
                      color: theme.palette.grey[500],
                      padding: {
                        xs: `${pxToRem(16)} ${pxToRem(0)}`,
                        sm: `${pxToRem(21)} ${pxToRem(16)} ${pxToRem(
                          21
                        )} ${pxToRem(0)}`,
                        md: `${pxToRem(12)} ${pxToRem(16)}`,
                      },
                    }}>
                    Recipient / Sender
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    padding: 0,
                    display: {
                      xs: "none",
                      sm: "table-cell",
                    },
                  }}>
                  <Typography
                    sx={{
                      fontSize: pxToRem(12),
                      color: theme.palette.grey[500],
                      padding: {
                        xs: `${pxToRem(16)} ${pxToRem(16)}`,
                        sm: `${pxToRem(21)} ${pxToRem(16)} ${pxToRem(
                          21
                        )} ${pxToRem(16)}`,
                        md: `${pxToRem(12)} ${pxToRem(16)}`,
                      },
                    }}>
                    Category
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    padding: 0,
                    display: {
                      xs: "none",
                      sm: "table-cell",
                    },
                  }}>
                  <Typography
                    sx={{
                      fontSize: pxToRem(12),
                      color: theme.palette.grey[500],
                      padding: {
                        xs: `${pxToRem(16)} ${pxToRem(16)}`,
                        sm: `${pxToRem(21)} ${pxToRem(16)} ${pxToRem(
                          21
                        )} ${pxToRem(16)}`,
                        md: `${pxToRem(12)} ${pxToRem(16)}`,
                      },
                    }}>
                    Transaction Date
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    padding: 0,
                    display: {
                      xs: "none",
                      sm: "table-cell",
                    },
                  }}>
                  <Typography
                    sx={{
                      fontSize: pxToRem(12),
                      color: theme.palette.grey[500],
                      padding: {
                        xs: `${pxToRem(21)} ${pxToRem(0)} ${pxToRem(
                          21
                        )} ${pxToRem(16)}`,
                        sm: `${pxToRem(21)} ${pxToRem(0)} ${pxToRem(
                          21
                        )} ${pxToRem(16)}`,
                        md: `${pxToRem(12)} ${pxToRem(16)}`,
                      },
                      textAlign: "right",
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
                  <TableRow key={transaction._id}>
                    <TableCell
                      sx={{
                        padding: {
                          xs: `${pxToRem(16)} ${pxToRem(16)} ${pxToRem(
                            16
                          )} ${pxToRem(0)}`,
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
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}>
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
                              display: {
                                xs: "flex",
                                sm: "none",
                              },
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
                        display: {
                          xs: "none",
                          sm: "table-cell",
                        },
                        padding: {
                          xs: `${pxToRem(16)} ${pxToRem(16)} ${pxToRem(
                            16
                          )} ${pxToRem(16)}`,
                          sm: `${pxToRem(16)} ${pxToRem(16)}`,
                          md: `${pxToRem(16)} ${pxToRem(16)}`,
                        },
                        fontSize: pxToRem(12),
                        color: theme.palette.grey[500],
                      }}>
                      {transaction.category}
                    </TableCell>
                    <TableCell
                      sx={{
                        display: {
                          xs: "none",
                          sm: "table-cell",
                        },
                        padding: {
                          xs: `${pxToRem(16)} ${pxToRem(16)} ${pxToRem(
                            16
                          )} ${pxToRem(16)}`,
                          sm: `${pxToRem(16)} ${pxToRem(16)}`,
                          md: `${pxToRem(16)} ${pxToRem(16)}`,
                        },
                        fontSize: pxToRem(12),
                        color: theme.palette.grey[500],
                      }}>
                      {format(new Date(transaction.date), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: {
                          xs: `${pxToRem(16)} ${pxToRem(0)} ${pxToRem(
                            16
                          )} ${pxToRem(16)}`,
                          sm: `${pxToRem(16)} ${pxToRem(0)} ${pxToRem(
                            16
                          )} ${pxToRem(16)}`,
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
                            fontSize: pxToRem(12),
                            fontWeight: "bold",
                          }}>
                          {transaction.amount >= 0 ? "+" : ""}
                          {transaction.amount.toFixed(2)}
                        </Typography>
                        <Typography
                          sx={{
                            display: {
                              xs: "flex",
                              sm: "none",
                            },
                            marginTop: { xs: pxToRem(4) },
                            fontSize: pxToRem(12),
                            textAlign: "right",
                            color: theme.palette.grey[500],
                          }}>
                          {format(new Date(transaction.date), "dd MMM yyyy")}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
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
      </Box>
    </Box>
  );
};

export default TransactionsContent;
