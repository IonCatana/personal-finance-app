import { useState, useEffect } from "react";
import { getBudgets } from "@components/budget/apiBudgets";

export const useBudgetsData = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const data = await getBudgets();
        setBudgets(data);
      } catch (error) {
        console.error("Errore nel recupero dei budget:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
  }, []);

  // Filtra solo i budget con un importo speso maggiore di 0
  const filteredBudgets = budgets.filter((budget) => budget.spentAmount > 0);

  // Dati per il grafico
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

  // Calcolo del totale speso e del limite massimo
  const totalSpent = budgets.reduce(
    (acc, budget) => acc + budget.spentAmount,
    0
  );
  const totalLimit = budgets.reduce((acc, budget) => acc + budget.maximum, 0);

  return { budgets, chartData, totalSpent, totalLimit, loading };
};
