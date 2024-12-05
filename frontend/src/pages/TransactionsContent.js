import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import SectionHeaderContent from "@components/headers/SectionHeaderContent";
import TransactionTable from "@components/transactions/TransactionTable";
import { fetchTransactions } from "@components/transactions/apiTransactions";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

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
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, []);

  const handleChangePage = (event, newPage) => setPage(newPage);
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
          style={{ color: theme.palette.secondaryColors.green }}
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
          padding: { xs: pxToRem(16), sm: pxToRem(32) },
          backgroundColor: theme.palette.otherColors.white,
          borderRadius: `${pxToRem(12)}`,
        }}>
        <TransactionTable
          transactions={transactions}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default TransactionsContent;
