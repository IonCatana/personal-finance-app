import React from "react";
import { Box, Typography } from "@mui/material";

/**
 * UserInfoContent Component
 *
 * Mostra le informazioni del profilo dell'utente.
 *
 * @param {string} token - Token dell'utente per recuperare dati protetti.
 */
const UserInfoContent = ({ token }) => {
  // Qui puoi inserire una chiamata API con il token per ottenere i dati dell'utente
  const userData = {
    name: "John Doe",
    email: "johndoe@example.com",
    joined: "2024-01-01",
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Information
      </Typography>
      <Typography variant="body1">
        <strong>Name:</strong> {userData.name}
      </Typography>
      <Typography variant="body1">
        <strong>Email:</strong> {userData.email}
      </Typography>
      <Typography variant="body1">
        <strong>Member Since:</strong> {userData.joined}
      </Typography>
    </Box>
  );
};

export default UserInfoContent;
