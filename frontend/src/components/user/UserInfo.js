import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { fetchUserInfo } from "@components/user/apiUser";
import { CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const UserInfo = ({ token }) => {
  const theme = useTheme();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      try {
        const data = await fetchUserInfo(token);
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data");
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, [token]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}>
        <CircularProgress
          style={{ color: theme.palette.secondaryColors.green }}
        />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">Errore: {error.error || error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="body1">
        <strong>Name:</strong> {userData.username}
      </Typography>
      <Typography variant="body1">
        <strong>Email:</strong> {userData.email}
      </Typography>
      <Typography variant="body1">
        <strong>Member Since:</strong>{" "}
        {new Date(userData.createdAt).toLocaleDateString()}
      </Typography>
    </Box>
  );
};

export default UserInfo;
