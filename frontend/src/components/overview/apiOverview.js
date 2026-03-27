import apiClient from "@utils/apiClient";

export const getOverview = async () => {
  try {
    const response = await apiClient.get("/overview");
    return response.data;
  } catch (error) {
    console.error("Error fetching overview:", error.message);
    throw error;
  }
};
