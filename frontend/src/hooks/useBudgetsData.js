// useBudgetsData.js
export const useBudgetsData = (budgets) => {
  const validBudgets = budgets || [];

  const filteredBudgets = validBudgets.filter(
    (budget) => budget.spentAmount > 0
  );

  const chartData = {
    labels: filteredBudgets.map((budget) => budget.category),
    datasets: [
      {
        data: filteredBudgets.map((budget) => budget.spentAmount),
        backgroundColor: filteredBudgets.map(
          (budget) => budget.color || "#E0E0E0"
        ),
        borderWidth: 0,
      },
    ],
  };

  const totalSpent = validBudgets.reduce(
    (acc, budget) => acc + budget.spentAmount,
    0
  );
  const totalLimit = validBudgets.reduce(
    (acc, budget) => acc + budget.maximum,
    0
  );

  return { chartData, totalSpent, totalLimit };
};
