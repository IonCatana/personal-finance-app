const Balance = require("@models/Balance");
const Budget = require("@models/Budget");
const Pot = require("@models/Pot");
const Transaction = require("@models/Transaction");

const roundCurrency = (value) =>
  Math.round((Number(value) + Number.EPSILON) * 100) / 100;

const getNumber = (value) => {
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
};

const getBalanceSummary = async (userId) => {
  const [balance, budgets, pots, transactions] = await Promise.all([
    Balance.findOne({ userId }),
    Budget.find({ userId }).select("maximum"),
    Pot.find({ userId }).select("total"),
    Transaction.find({ userId }).select("amount"),
  ]);

  const baseCurrent = balance ? roundCurrency(balance.current) : 0;
  const dynamicIncome = roundCurrency(
    transactions.reduce((sum, transaction) => {
      const amount = getNumber(transaction.amount);
      return amount > 0 ? sum + amount : sum;
    }, 0)
  );
  const dynamicExpenses = roundCurrency(
    transactions.reduce((sum, transaction) => {
      const amount = getNumber(transaction.amount);
      return amount < 0 ? sum + Math.abs(amount) : sum;
    }, 0)
  );
  const allocatedToBudgets = roundCurrency(
    budgets.reduce((sum, budget) => sum + getNumber(budget.maximum), 0)
  );
  const allocatedToPots = roundCurrency(
    pots.reduce((sum, pot) => sum + getNumber(pot.total), 0)
  );
  const totalAllocated = roundCurrency(allocatedToBudgets + allocatedToPots);
  const rawAvailableToAllocate = roundCurrency(baseCurrent - totalAllocated);
  const availableToAllocate = Math.max(rawAvailableToAllocate, 0);
  const overAllocatedAmount = roundCurrency(
    Math.max(rawAvailableToAllocate * -1, 0)
  );

  return {
    balance,
    baseCurrent,
    dynamicIncome,
    dynamicExpenses,
    allocatedToBudgets,
    allocatedToPots,
    totalAllocated,
    rawAvailableToAllocate,
    availableToAllocate,
    overAllocatedAmount,
  };
};

const buildBalanceResponse = (summary) => ({
  ...summary.balance.toObject(),
  baseCurrent: summary.baseCurrent,
  current: summary.availableToAllocate,
  income: summary.dynamicIncome,
  expenses: summary.dynamicExpenses,
  storedIncome: getNumber(summary.balance.income),
  storedExpenses: getNumber(summary.balance.expenses),
  allocatedToBudgets: summary.allocatedToBudgets,
  allocatedToPots: summary.allocatedToPots,
  totalAllocated: summary.totalAllocated,
  rawAvailableToAllocate: summary.rawAvailableToAllocate,
  availableToAllocate: summary.availableToAllocate,
  overAllocatedAmount: summary.overAllocatedAmount,
});

const createValidationError = (message) => {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
};

module.exports = {
  roundCurrency,
  getNumber,
  getBalanceSummary,
  buildBalanceResponse,
  createValidationError,
};
