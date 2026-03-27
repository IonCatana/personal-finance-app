const DUE_SOON_WINDOW_DAYS = 5;
const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

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

export const getRecurringBillKey = (transaction = {}) =>
  `${String(transaction.name || "").trim().toLowerCase()}::${String(
    transaction.category || ""
  )
    .trim()
    .toLowerCase()}`;

export const getLatestRecurringBills = (transactions = []) => {
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

export const getCurrentCycleDueDate = (
  transaction,
  referenceDate = new Date()
) => {
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

export const getRecurringBillStatus = (
  transaction,
  referenceDate = new Date()
) => {
  const today = getStartOfDay(referenceDate);
  const currentCycleDueDate = getCurrentCycleDueDate(transaction, today);
  const isPaid = currentCycleDueDate < today;
  const daysUntilDue = Math.ceil(
    (currentCycleDueDate.getTime() - today.getTime()) / MILLISECONDS_IN_A_DAY
  );
  const isDueSoon =
    !isPaid && daysUntilDue >= 0 && daysUntilDue <= DUE_SOON_WINDOW_DAYS;

  return {
    currentCycleDueDate,
    daysUntilDue,
    isDueSoon,
    isPaid,
    isUpcoming: !isPaid,
  };
};

export const calculateBillsSummary = (
  transactions = [],
  referenceDate = new Date()
) => {
  const recurringBills = getLatestRecurringBills(transactions);

  const summary = recurringBills.reduce(
    (accumulator, bill) => {
      const amount = Math.abs(getNumber(bill.amount));
      const { isPaid, isDueSoon } = getRecurringBillStatus(bill, referenceDate);

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
    totalBillsAmount: Math.round(summary.totalBillsAmount * 100) / 100,
    paidCount: summary.paidCount,
    paidAmount: Math.round(summary.paidAmount * 100) / 100,
    upcomingCount: summary.upcomingCount,
    upcomingAmount: Math.round(summary.upcomingAmount * 100) / 100,
    dueSoonCount: summary.dueSoonCount,
    dueSoonAmount: Math.round(summary.dueSoonAmount * 100) / 100,
  };
};

export { DUE_SOON_WINDOW_DAYS };
