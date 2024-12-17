import React from "react";
import { Box } from "@mui/material";
import SectionHeaderContent from "@components/headers/SectionHeaderContent";
import UserInfo from "@components/user/UserInfo";

/**
 * UserInfoContent Component
 *
 * Mostra le informazioni del profilo dell'utente.
 *
 * @param {string} token - Token dell'utente per recuperare dati protetti.
 */
const UserInfoContent = (userData) => {
  return (
    <Box>
      <SectionHeaderContent title="User Info" />
      <UserInfo userData={userData} />
    </Box>
  );
};

export default UserInfoContent;
