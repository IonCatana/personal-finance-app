export const calculateBillsSummary = (transactions) => {
  const today = new Date();

  const totalBillsAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

  const paidTransactions = transactions.filter(
    (t) => t.recurring === true && new Date(t.date) < today
  );

  const totalUpcomingTransactions = transactions.filter(
    (t) => t.recurring === false && new Date(t.date) > today
  );

  const dueSoonTransactions = transactions.filter(
    (t) => t.recurring === false && new Date(t.date) < today
  );

  const paidCount = paidTransactions.length;
  const paidAmount = paidTransactions.reduce(
    (sum, t) => sum + Math.abs(t.amount),
    0
  );

  const upcomingCount = totalUpcomingTransactions.length;
  const upcomingAmount = totalUpcomingTransactions.reduce(
    (sum, t) => sum + Math.abs(t.amount),
    0
  );

  const dueSoonCount = dueSoonTransactions.length;
  const dueSoonAmount = dueSoonTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  return {
    totalBillsAmount,
    paidCount,
    paidAmount,
    upcomingCount,
    upcomingAmount,
    dueSoonCount,
    dueSoonAmount,
  };
};
