import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { fetchTransactions } from "@components/transactions/apiTransactions";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import { sortOptions } from "@components/sort/sortOptions";
import { categoryOptions } from "@components/category/categoryOptions";
import SectionHeaderContent from "@components/headers/SectionHeaderContent";
import SearchBarFilters from "@components/transactions/SearchBarFilters";
import TransactionsTableContainer from "@components/transactions/TransactionsTableContainer";
import BillsSummary from "@components/bills/BillsSummary";
import { calculateBillsSummary } from "@components/bills/apiBills";

const RecurringBillsContent = () => {
  const theme = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
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

  const {
    totalBillsAmount,
    paidCount,
    paidAmount,
    upcomingCount,
    upcomingAmount,
    dueSoonCount,
    dueSoonAmount,
  } = calculateBillsSummary(transactions);

  return (
    <>
      <SectionHeaderContent title="Recurring Bills" />
      <Box
        className="recurring-bills-content"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          gap: pxToRem(24),
        }}>
        <Box
          className="content-left"
          sx={{
            maxWidth: { xs: "100%", sm: "100%", md: pxToRem(337) },
            width: "100%",
            display: "flex",
            gap: pxToRem(24),
            flexDirection: { xs: "column", sm: "row", md: "column" },
          }}>
          <Box
            className="total-bills"
            sx={{
              width: "100%",
              borderRadius: pxToRem(12),
              padding: { xs: `${pxToRem(24)} ${pxToRem(20)}`, sm: pxToRem(24) },
              backgroundColor: theme.palette.grey[900],
              color: theme.palette.otherColors.white,
              display: { xs: "flex", sm: "flex", md: "flex" },
              flexDirection: { xs: "row", sm: "column", md: "column" },
              alignItems: { xs: "center", sm: "unset" },
              gap: { xs: pxToRem(20), sm: pxToRem(32) },
            }}>
            <Box
              sx={{
                width: pxToRem(40),
                height: pxToRem(40),
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <svg
                fill="none"
                height="28"
                viewBox="0 0 32 28"
                width="32"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m24.4375 10.25c0 .2486-.0988.4871-.2746.6629s-.4143.2746-.6629.2746h-15c-.24864 0-.4871-.0988-.66291-.2746-.17582-.1758-.27459-.4143-.27459-.6629s.09877-.4871.27459-.66291c.17581-.17582.41427-.27459.66291-.27459h15c.2486 0 .4871.09877.6629.27459.1758.17581.2746.41431.2746.66291zm-.9375 4.0625h-15c-.24864 0-.4871.0988-.66291.2746-.17582.1758-.27459.4143-.27459.6629s.09877.4871.27459.6629c.17581.1758.41427.2746.66291.2746h15c.2486 0 .4871-.0988.6629-.2746s.2746-.4143.2746-.6629-.0988-.4871-.2746-.6629-.4143-.2746-.6629-.2746zm8.4375-11.5625v23.75c-.0002.1598-.0412.3168-.1191.4563-.078.1395-.1902.2567-.3262.3406-.1476.0921-.3182.1409-.4922.1406-.1453.0001-.2887-.0336-.4187-.0984l-4.5813-2.2907-4.5813 2.2907c-.13.0649-.2734.0987-.4187.0987s-.2887-.0338-.4187-.0987l-4.5813-2.2907-4.5813 2.2907c-.13.0649-.2734.0987-.4187.0987s-.2887-.0338-.4187-.0987l-4.5813-2.2907-4.58125 2.2907c-.14295.0713-.30178.105-.461388.0977-.159613-.0073-.314721-.0552-.450598-.1393-.135877-.084-.248016-.2014-.325769-.341-.077754-.1396-.1185428-.2967-.118495-.4565v-23.75c0-.58016.230468-1.13656.640704-1.5468.410236-.410232.966636-.6407 1.546796-.6407h27.5c.5802 0 1.1366.230468 1.5468.6407.4102.41024.6407.96664.6407 1.5468zm-1.875 0c0-.08288-.0329-.16237-.0915-.22097-.0586-.05861-.1381-.09153-.221-.09153h-27.5c-.08288 0-.16237.03292-.22097.09153-.05861.0586-.09153.13809-.09153.22097v22.2328l3.64375-1.8219c.13004-.0649.2734-.0987.41875-.0987s.28871.0338.41875.0987l4.58125 2.2907 4.5813-2.2907c.13-.0649.2734-.0987.4187-.0987s.2887.0338.4187.0987l4.5813 2.2907 4.5813-2.2907c.13-.0649.2734-.0987.4187-.0987s.2887.0338.4187.0987l3.6438 1.8219z"
                  fill="#fff"
                />
              </svg>
            </Box>
            <Box>
              <Typography
                sx={{
                  typography: "textPreset4",
                  marginBottom: pxToRem(11),
                }}>
                Total Bills
              </Typography>
              <Typography
                sx={{
                  typography: "textPreset1",
                }}>
                {totalBillsAmount.toFixed(2)}
              </Typography>
            </Box>
          </Box>
          <BillsSummary
            paidCount={paidCount}
            paidAmount={paidAmount}
            upcomingCount={upcomingCount}
            upcomingAmount={upcomingAmount}
            dueSoonCount={dueSoonCount}
            dueSoonAmount={dueSoonAmount}
          />
        </Box>
        <Box
          className="content-right"
          sx={{
            width: "100%",
            borderRadius: pxToRem(12),
            padding: pxToRem(32),
            backgroundColor: theme.palette.otherColors.white,
          }}>
          {/* Aggiunta della SearchBarFilters */}
          <SearchBarFilters
            placeholder="Search bills"
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
            hideCategory={true}
          />

          {/* Aggiunta della TransactionsTableContainer */}
          <TransactionsTableContainer
            titleRecipientSender={"Bill Title"}
            transactionDueDate={"Due Date"}
            transactions={transactions}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            // hideRecipient={false}
            hideCategory={true}
            hideTransactionDate={true}
            hideDate={true}
            // hideAmount={false}
          />
        </Box>
      </Box>
    </>
  );
};

export default RecurringBillsContent;
