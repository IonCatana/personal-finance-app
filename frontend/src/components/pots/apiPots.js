import apiClient from "@utils/apiClient";

// Recupera tutti i pots
export const getPots = async (options = {}) => {
  const includeBalanceSummary =
    typeof options === "object" && options !== null
      ? options.includeBalanceSummary
      : false;
  // console.log("Fetching all pots...");
  const response = await apiClient.get("/pots", {
    params: includeBalanceSummary ? { includeBalanceSummary: "true" } : {},
  });
  // console.log("Response received:", response.data);
  return response.data;
};

// Aggiungi un nuovo pot
export const createPot = async (potData) => {
  // console.log("Creating a new pot with data:", potData);
  const response = await apiClient.post("/pots", potData);
  // console.log("Response received:", response.data);
  return response.data;
};

// Aggiorna un pot esistente
export const updatePot = async (id, potData) => {
  // console.log(`Updating pot with id ${id} and data:`, potData);
  const response = await apiClient.put(`/pots/${id}`, potData);
  // console.log("Response received:", response.data);
  return response.data;
};

// Elimina un pot
export const deletePot = async (id) => {
  // console.log(`Deleting pot with id ${id}`);
  const response = await apiClient.delete(`/pots/${id}`);
  // console.log("Response received:", response.data);
  return response.data;
};
