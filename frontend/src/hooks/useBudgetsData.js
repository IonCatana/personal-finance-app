export const useBudgetsData = (budgets, transactions = []) => {
  const validBudgets = budgets || [];

  // Calcola dinamicamente il `spentAmount` per ogni budget
  const filteredBudgets = validBudgets.map((budget) => {
    const spentAmount = transactions
      .filter((transaction) => transaction.category === budget.category)
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    return { ...budget, spentAmount }; // Aggiorna ogni budget con `spentAmount`
  });

  // Prepara i dati per il grafico
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

  // Calcola i totali
  const totalSpent = filteredBudgets.reduce(
    (acc, budget) => acc + budget.spentAmount,
    0
  );

  const totalLimit = filteredBudgets.reduce(
    (acc, budget) => acc + (budget.maximum || 0),
    0
  );

  return { chartData, totalSpent, totalLimit };
};
