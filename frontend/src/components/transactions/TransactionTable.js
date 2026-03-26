import React from "react";
import CustomPagination from "@components/transactions/CustomPagination";
import TransactionsTableContainer from "@components/transactions/TransactionsTableContainer";

const TransactionTable = ({
  transactions,
  totalCount,
  page,
  rowsPerPage,
  useServerPagination = false,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const totalItems = useServerPagination ? totalCount : transactions.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  return (
    <>
      <TransactionsTableContainer
        titleRecipientSender={" Recipient / Sender"}
        transactionDate={"Transaction Date"}
        transactions={transactions}
        page={page}
        rowsPerPage={rowsPerPage}
        useServerPagination={useServerPagination}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        hideRecipient={false}
        hideCategory={false}
        hideDate={false}
        hideAmount={false}
        hideTransactionDueDate={true}
      />
      <CustomPagination
        page={page}
        totalPages={totalPages}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TransactionTable;
