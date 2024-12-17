import apiClient from "@utils/apiClient";

export const fetchUserInfo = async (token) => {
  try {
    const response = await apiClient.get("/user/info", {
      headers: {
        Authorization: token,
      },
    });
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user info:", error.response.data);
    throw error;
  }
};
