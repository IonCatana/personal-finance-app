import apiClient from "@utils/apiClient";
/**
 * **Funzioni API Transactions**
 * - Centralizza tutte le chiamate relative alle transazioni.
 * - Utilizza l'istanza `apiClient` preconfigurata per includere automaticamente il token.
 */

// Recupera tutte le transazioni con parametri opzionali
export const fetchTransactions = async (
  page = 0,
  rowsPerPage = 10,
  search = "",
  category = "All Transactions",
  sort = "latest"
) => {
  try {
    const response = await apiClient.get("/transactions", {
      params: { page, rowsPerPage, search, category, sort },
    });
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero delle transactions:", error);
    throw error.response?.data || error.message;
  }
};

// Recupera le transazioni per una categoria specifica
export const fetchTransactionsByCategory = async (category) => {
  try {
    const response = await apiClient.get("/transactions", {
      params: { category }, // Passa la categoria come query param
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions by category:", error);
    throw error;
  }
};

// Aggiungi altre funzioni API per gestire le transazioni (ad esempio POST, PUT, DELETE)
export const createTransaction = async (transactionData) => {
  try {
    const response = await apiClient.post("/transactions", transactionData);
    return response.data;
  } catch (error) {
    console.error("Errore nella creazione della transaction:", error);
    throw error.response?.data || error.message;
  }
};

export const updateTransaction = async (transactionId, updatedData) => {
  try {
    const response = await apiClient.put(
      `/transactions/${transactionId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Errore nell'aggiornamento della transaction:", error);
    throw error.response?.data || error.message;
  }
};

export const deleteTransaction = async (transactionId) => {
  try {
    const response = await apiClient.delete(`/transactions/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error("Errore nell'eliminazione della transaction:", error);
    throw error.response?.data || error.message;
  }
};
