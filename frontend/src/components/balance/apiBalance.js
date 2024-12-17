import apiClient from "@utils/apiClient";

// Ottieni il bilancio corrente
export const getBalance = async () => {
  try {
    const response = await apiClient.get("/balance");
    return response.data;
  } catch (error) {
    console.error("Error fetching balance:", error.message);
    throw error;
  }
};

// Crea un nuovo bilancio
export const createBalance = async (balanceData) => {
  try {
    const response = await apiClient.post("/balance", balanceData);
    return response.data;
  } catch (error) {
    console.error("Error creating balance:", error.message);
    throw error;
  }
};

// Aggiorna il bilancio
export const updateBalance = async (balanceData) => {
  try {
    const response = await apiClient.put("/balance", balanceData);
    return response.data;
  } catch (error) {
    console.error("Error updating balance:", error.message);
    throw error;
  }
};

// Elimina il bilancio
export const deleteBalance = async () => {
  try {
    const response = await apiClient.delete("/balance");
    return response.data;
  } catch (error) {
    console.error("Error deleting balance:", error.message);
    throw error;
  }
};
