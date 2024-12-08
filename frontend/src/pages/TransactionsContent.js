import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import BasicInput from "@components/inputFields/BasicInput";
import SectionHeaderContent from "@components/headers/SectionHeaderContent";
import TransactionTable from "@components/transactions/TransactionTable";
import { fetchTransactions } from "@components/transactions/apiTransactions";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@assets/images/icon-search.svg";
import SortIcon from "@assets/images/icon-sort-mobile.svg";
import CategoryIcon from "@assets/images/icon-filter-mobile.svg";

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

  // Stato per il menu Sort
  const [sortAnchor, setSortAnchor] = useState(null);
  const openSortMenu = Boolean(sortAnchor);

  // Stato per il menu Category
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

  const handleSortSelect = (value) => {
    setSort(value);
    setSortAnchor(null);
  };

  const handleCategoryClick = (event) => {
    setCategoryAnchor(event.currentTarget);
  };

  const handleCategorySelect = (value) => {
    setCategory(value);
    setCategoryAnchor(null);
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: pxToRem(24),
            width: "100%",
            marginBottom: pxToRem(24),
          }}>
          {/* Campo di ricerca */}
          <BasicInput
            sx={{
              marginBottom: pxToRem(0),
              maxWidth: { xs: "unset", sm: pxToRem(300) },
              width: "100%",
            }}
            value={searchInput}
            placeholder="Search transaction"
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
            endIcon={
              <InputAdornment
                position="end"
                sx={{
                  marginRight: pxToRem(0),
                  cursor: "pointer",
                }}>
                <IconButton onClick={handleSearchSubmit}>
                  <img
                    src={SearchIcon}
                    alt={SearchIcon}
                    style={{ width: pxToRem(16), height: pxToRem(16) }}
                  />
                </IconButton>
              </InputAdornment>
            }
          />
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: pxToRem(24),
            }}>
            {/* Filtro ordinamento */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: pxToRem(8),
              }}>
              <Typography
                sx={{
                  typography: "textPreset4",
                  color: theme.palette.grey[500],
                  whiteSpace: "nowrap",
                }}>
                Sort by
              </Typography>
              <BasicInput
                sx={{
                  maxWidth: pxToRem(113),
                  width: "100%",
                  marginBottom: pxToRem(0),
                }}
                options={[
                  { value: "latest", label: "Latest" },
                  { value: "oldest", label: "Oldest" },
                  { value: "AtoZ", label: "A to Z" },
                  { value: "ZtoA", label: "Z to A" },
                  { value: "highest", label: "Highest" },
                  { value: "lowest", label: "Lowest" },
                ]}
                value={sort}
                onChange={(selected) => setSort(selected.value)}
              />
            </Box>

            {/* Filtro categoria */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: pxToRem(8),
              }}>
              <Typography
                sx={{
                  typography: "textPreset4",
                  color: theme.palette.grey[500],
                  whiteSpace: "nowrap",
                }}>
                Category
              </Typography>
              <BasicInput
                sx={{
                  maxWidth: pxToRem(177),
                  width: "100%",
                  marginBottom: pxToRem(0),
                }}
                options={[
                  { value: "All Transactions", label: "All Transactions" },
                  { value: "Entertainment", label: "Entertainment" },
                  { value: "Bills", label: "Bills" },
                  { value: "Groceries", label: "Groceries" },
                  { value: "Dining Out", label: "Dining Out" },
                  { value: "Transportation", label: "Transportation" },
                  { value: "Personal Care", label: "Personal Care" },
                  { value: "Education", label: "Education" },
                  { value: "Lifestyle", label: "Lifestyle" },
                  { value: "Shopping", label: "Shopping" },
                  { value: "General", label: "General" },
                ]}
                value={category}
                onChange={(selected) => setCategory(selected.value)}
              />
            </Box>
          </Box>
          {/* Icone mobile per filtri */}
          <Box
            sx={{
              display: { xs: "flex", sm: "none" }, // Visibile su xs, nascondi su sm+
              alignItems: "center",

              justifyContent: "space-between",
              maxWidth: pxToRem(64),
              width: "100%",
            }}>
            <Box onClick={handleSortClick}>
              <img
                src={SortIcon}
                alt={SortIcon}
                style={{
                  width: pxToRem(15),
                  height: pxToRem(15),
                  cursor: "pointer",
                }}
              />
            </Box>
            <Box onClick={handleCategoryClick}>
              <img
                src={CategoryIcon}
                alt={CategoryIcon}
                style={{
                  width: pxToRem(15),
                  height: pxToRem(15),
                  cursor: "pointer",
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Menu per Sort */}
        <Menu
          sx={{ marginTop: pxToRem(16) }}
          anchorEl={sortAnchor}
          open={openSortMenu}
          onClose={() => setSortAnchor(null)}>
          {[
            { value: "latest", label: "Latest" },
            { value: "oldest", label: "Oldest" },
            { value: "AtoZ", label: "A to Z" },
            { value: "ZtoA", label: "Z to A" },
            { value: "highest", label: "Highest" },
            { value: "lowest", label: "Lowest" },
          ].map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleSortSelect(option.value)}>
              {option.label}
            </MenuItem>
          ))}
        </Menu>

        {/* Menu per Category */}
        <Menu
          sx={{ marginTop: pxToRem(16) }}
          anchorEl={categoryAnchor}
          open={openCategoryMenu}
          onClose={() => setCategoryAnchor(null)}>
          {[
            { value: "All Transactions", label: "All Transactions" },
            { value: "Entertainment", label: "Entertainment" },
            { value: "Bills", label: "Bills" },
            { value: "Groceries", label: "Groceries" },
            { value: "Dining Out", label: "Dining Out" },
            { value: "Transportation", label: "Transportation" },
            { value: "Personal Care", label: "Personal Care" },
            { value: "Education", label: "Education" },
            { value: "Lifestyle", label: "Lifestyle" },
            { value: "Shopping", label: "Shopping" },
            { value: "General", label: "General" },
          ].map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleCategorySelect(option.value)}>
              {option.label}
            </MenuItem>
          ))}
        </Menu>
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
