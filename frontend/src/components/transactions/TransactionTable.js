import React from "react";
import CustomPagination from "@components/transactions/CustomPagination";
import TransactionsTableContainer from "@components/transactions/TransactionsTableContainer";

const TransactionTable = ({
  transactions,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  return (
    <>
      <TransactionsTableContainer
        titleRecipientSender={" Recipient / Sender"}
        transactionDate={"Transaction Date"}
        transactions={transactions}
        page={page}
        rowsPerPage={rowsPerPage}
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
