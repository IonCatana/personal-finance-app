import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import {
  fetchUserInfo,
  updateUserInfo,
  changePassword,
  deleteUser,
} from "@components/user/apiUser";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import BasicInput from "@components/inputFields/BasicInput";
import ButtonDestroy from "@components/buttons/ButtonDestroy";
import ButtonPrimary from "@components/buttons/ButtonPrimary";

const UserInfo = ({ token }) => {
  const theme = useTheme();
  // eslint-disable-next-line
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updates, setUpdates] = useState({ username: "", email: "" });
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      try {
        const data = await fetchUserInfo(token);
        setUserData(data);
        setUpdates({ username: data.username, email: data.email });
      } catch (error) {
        console.error("Failed to fetch user data");
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, [token]);

  const handleUpdate = async () => {
    try {
      await updateUserInfo(token, updates);
      alert("User info updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update user info.");
    }
  };

  const handleChangePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      return alert("New passwords do not match!");
    }
    try {
      await changePassword(token, passwords);
      alert("Password changed successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to change password.");
    }
  };

  const handleDeleteUser = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;
    try {
      await deleteUser(token);
      alert("Account deleted successfully!");
      // Puoi aggiungere il logout o una redirezione qui
    } catch (err) {
      console.error(err);
      alert("Failed to delete account.");
    }
  };

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
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: pxToRem(32), md: pxToRem(24) },
      }}>
      <Box
        sx={{
          flex: 1,
        }}>
        <Typography variant="h5" gutterBottom>
          Change Info
        </Typography>
        <BasicInput
          label="Name"
          value={updates.username}
          onChange={(e) => setUpdates({ ...updates, username: e.target.value })}
        />
        <BasicInput
          label="Email"
          value={updates.email}
          onChange={(e) => setUpdates({ ...updates, email: e.target.value })}
        />
        <ButtonPrimary onClick={handleUpdate}>Update Info</ButtonPrimary>
      </Box>
      <Box
        sx={{
          flex: 1,
        }}>
        <Typography variant="h5" gutterBottom>
          Change Password
        </Typography>
        <BasicInput
          label="Old Password"
          type="password"
          value={passwords.oldPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, oldPassword: e.target.value })
          }
        />
        <BasicInput
          label="New Password"
          type="password"
          value={passwords.newPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, newPassword: e.target.value })
          }
        />
        <BasicInput
          label="Confirm New Password"
          type="password"
          value={passwords.confirmPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, confirmPassword: e.target.value })
          }
        />
        <ButtonPrimary onClick={handleChangePassword}>
          Change Password
        </ButtonPrimary>
      </Box>
      <Box
        sx={{
          flex: 1,
        }}>
        <Typography
          variant="h5"
          sx={{
            marginBottom: pxToRem(22),
          }}>
          Delete Account
        </Typography>
        <ButtonDestroy onClick={handleDeleteUser}>
          Delete My Account
        </ButtonDestroy>
      </Box>
    </Box>
  );
};

export default UserInfo;
