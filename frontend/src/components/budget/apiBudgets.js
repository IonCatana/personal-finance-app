import apiClient from "@utils/apiClient"; // Importa il modulo API Client

// Recuperare tutti i budget
export const getBudgets = async () => {
  try {
    const response = await apiClient.get("/budgets");
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero dei budget:", error);
    throw error;
  }
};

// Creare un nuovo budget
export const createBudget = async (budget) => {
  try {
    const response = await apiClient.post("/budgets", budget);
    return response.data;
  } catch (error) {
    console.error("Errore nella creazione del budget:", error);
    throw error;
  }
};

// Aggiornare un budget
export const updateBudget = async (id, budget) => {
  try {
    const response = await apiClient.put(`/budgets/${id}`, budget);
    return response.data;
  } catch (error) {
    console.error("Errore nell'aggiornamento del budget:", error);
    throw error;
  }
};

// Eliminare un budget
export const deleteBudget = async (id) => {
  try {
    const response = await apiClient.delete(`/budgets/${id}`);
    return response.data;
  } catch (error) {
    console.error("Errore nell'eliminazione del budget:", error);
    throw error;
  }
};
