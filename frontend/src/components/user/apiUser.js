import apiClient from "@utils/apiClient";

/**
 * Fetch user information
 * @param {string} token - Authorization token
 */
export const fetchUserInfo = async (token) => {
  try {
    const response = await apiClient.get("/user/info", {
      headers: { Authorization: token },
    });
    return response.data.user;
  } catch (error) {
    console.error(
      "Error fetching user info:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Update user information (name, email)
 * @param {string} token - Authorization token
 * @param {object} updates - Object containing updated fields { username, email }
 */
export const updateUserInfo = async (token, updates) => {
  try {
    const response = await apiClient.put("/user/update", updates, {
      headers: { Authorization: token },
    });
    return response.data.message;
  } catch (error) {
    console.error(
      "Error updating user info:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Change user password
 * @param {string} token - Authorization token
 * @param {object} passwords - Object containing oldPassword, newPassword
 */
export const changePassword = async (token, passwords) => {
  try {
    const response = await apiClient.put("/user/change-password", passwords, {
      headers: { Authorization: token },
    });
    return response.data.message;
  } catch (error) {
    console.error(
      "Error changing password:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Delete user account
 * @param {string} token - Authorization token
 */
export const deleteUser = async (token) => {
  try {
    const response = await apiClient.delete("/user/delete", {
      headers: { Authorization: token },
    });
    return response.data.message;
  } catch (error) {
    console.error(
      "Error deleting user:",
      error.response?.data || error.message
    );
    throw error;
  }
};
