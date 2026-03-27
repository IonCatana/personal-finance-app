const roundCurrency = (value) =>
  Math.round((Number(value) + Number.EPSILON) * 100) / 100;

const DUE_SOON_WINDOW_DAYS = 5;

const getNumber = (value) => {
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
};

const getStartOfDay = (value = new Date()) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
};

const getDaysInMonth = (year, monthIndex) =>
  new Date(year, monthIndex + 1, 0).getDate();

const getRecurringBillKey = (transaction = {}) =>
  `${String(transaction.name || "").trim().toLowerCase()}::${String(
    transaction.category || ""
  )
    .trim()
    .toLowerCase()}`;

const getLatestRecurringBills = (transactions = []) => {
  const recurringBillsMap = new Map();

  transactions
    .filter((transaction) => transaction?.recurring === true)
    .forEach((transaction) => {
      const key = getRecurringBillKey(transaction);
      const currentTransactionDate = new Date(transaction.date);
      const existingTransaction = recurringBillsMap.get(key);

      if (
        !existingTransaction ||
        currentTransactionDate > new Date(existingTransaction.date)
      ) {
        recurringBillsMap.set(key, transaction);
      }
    });

  return Array.from(recurringBillsMap.values());
};

const getCurrentCycleDueDate = (transaction, referenceDate = new Date()) => {
  const baseDate = new Date(transaction.date);
  const currentYear = referenceDate.getFullYear();
  const currentMonth = referenceDate.getMonth();
  const dueDay = Math.min(
    baseDate.getDate(),
    getDaysInMonth(currentYear, currentMonth)
  );

  return new Date(
    currentYear,
    currentMonth,
    dueDay,
    baseDate.getHours(),
    baseDate.getMinutes(),
    baseDate.getSeconds(),
    baseDate.getMilliseconds()
  );
};

const getDifferenceInDays = (laterDate, earlierDate) =>
  Math.ceil((laterDate.getTime() - earlierDate.getTime()) / 86400000);

const calculateBillsSummary = (
  transactions = [],
  referenceDate = new Date()
) => {
  const today = getStartOfDay(referenceDate);
  const recurringBills = getLatestRecurringBills(transactions);

  const summary = recurringBills.reduce(
    (accumulator, bill) => {
      const amount = Math.abs(getNumber(bill.amount));
      const currentCycleDueDate = getCurrentCycleDueDate(bill, today);
      const isPaid = currentCycleDueDate < today;
      const daysUntilDue = getDifferenceInDays(currentCycleDueDate, today);
      const isDueSoon =
        !isPaid && daysUntilDue >= 0 && daysUntilDue <= DUE_SOON_WINDOW_DAYS;

      accumulator.totalBillsAmount += amount;

      if (isPaid) {
        accumulator.paidCount += 1;
        accumulator.paidAmount += amount;
      } else {
        accumulator.upcomingCount += 1;
        accumulator.upcomingAmount += amount;

        if (isDueSoon) {
          accumulator.dueSoonCount += 1;
          accumulator.dueSoonAmount += amount;
        }
      }

      return accumulator;
    },
    {
      totalBillsAmount: 0,
      paidCount: 0,
      paidAmount: 0,
      upcomingCount: 0,
      upcomingAmount: 0,
      dueSoonCount: 0,
      dueSoonAmount: 0,
    }
  );

  return {
    totalBillsAmount: roundCurrency(summary.totalBillsAmount),
    paidCount: summary.paidCount,
    paidAmount: roundCurrency(summary.paidAmount),
    upcomingCount: summary.upcomingCount,
    upcomingAmount: roundCurrency(summary.upcomingAmount),
    dueSoonCount: summary.dueSoonCount,
    dueSoonAmount: roundCurrency(summary.dueSoonAmount),
  };
};

module.exports = {
  DUE_SOON_WINDOW_DAYS,
  calculateBillsSummary,
  getCurrentCycleDueDate,
  getLatestRecurringBills,
  getRecurringBillKey,
  roundCurrency,
};
