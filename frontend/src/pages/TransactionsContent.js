import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import SectionHeaderContent from "@components/headers/SectionHeaderContent";
import TransactionTable from "@components/transactions/TransactionTable";
import { fetchTransactions } from "@components/transactions/apiTransactions";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import { sortOptions } from "@components/sort/sortOptions";
import { categoryOptions } from "@components/category/categoryOptions";
import SearchBarFilters from "@components/transactions/SearchBarFilters";

const TransactionsContent = () => {
  const theme = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Transactions");
  const [sort, setSort] = useState("latest");
  const [searchInput, setSearchInput] = useState("");

  const [sortAnchor, setSortAnchor] = useState(null);
  const openSortMenu = Boolean(sortAnchor);

  const [categoryAnchor, setCategoryAnchor] = useState(null);
  const openCategoryMenu = Boolean(categoryAnchor);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        setLoading(true);
        const data = await fetchTransactions(
          page,
          rowsPerPage,
          search,
          category,
          sort
        );
        setTransactions(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, [page, rowsPerPage, search, category, sort]);

  const handleSearchSubmit = () => {
    setSearch(searchInput);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortClick = (event) => {
    setSortAnchor(event.currentTarget);
  };

  const handleCategoryClick = (event) => {
    setCategoryAnchor(event.currentTarget);
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
          padding: { xs: `${pxToRem(24)} ${pxToRem(20)}`, sm: pxToRem(32) },
          backgroundColor: theme.palette.otherColors.white,
          borderRadius: `${pxToRem(12)}`,
          width: "100%",
        }}>
        <SearchBarFilters
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleSearchSubmit={handleSearchSubmit}
          handleKeyPress={handleKeyPress}
          sort={sort}
          setSort={setSort}
          category={category}
          setCategory={setCategory}
          sortOptions={sortOptions}
          categoryOptions={categoryOptions}
          handleSortClick={handleSortClick}
          handleCategoryClick={handleCategoryClick}
          sortAnchor={sortAnchor}
          openSortMenu={openSortMenu}
          setSortAnchor={setSortAnchor}
          categoryAnchor={categoryAnchor}
          openCategoryMenu={openCategoryMenu}
          setCategoryAnchor={setCategoryAnchor}
        />

        <TransactionTable
          hideTransactionDueDate={true}
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
