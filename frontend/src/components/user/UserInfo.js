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
import Snackbar from "@components/snackbar/SnackBar";

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

  // Stato per controllare lo Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    label: "",
    severity: "info",
  });

  // Funzione per aprire lo Snackbar
  const showSnackbar = (label, severity) => {
    setSnackbar({ open: true, label, severity });
  };

  const closeSnackbar = () => {
    setSnackbar({ open: false, label: "", severity: "info" });
  };

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
        showSnackbar("Failed to fetch user data.", "error");
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, [token]);

  const handleUpdate = async () => {
    try {
      await updateUserInfo(token, updates);
      showSnackbar("User info updated successfully!", "success");
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to update user info.", "error");
    }
  };

  const handleChangePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      return showSnackbar("New passwords do not match!", "warning");
    }
    try {
      await changePassword(token, passwords);
      showSnackbar("Password changed successfully!", "success");
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to change password.", "error");
    }
  };

  const handleDeleteUser = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;
    try {
      await deleteUser(token);
      showSnackbar("Account deleted successfully!", "success");
      // Esegui logout o redirezione qui se necessario
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to delete account.", "error");
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
    <>
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
            onChange={(e) =>
              setUpdates({ ...updates, username: e.target.value })
            }
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
      {/* Snackbar per notifiche */}
      <Snackbar
        open={snackbar.open}
        onClose={closeSnackbar}
        label={snackbar.label}
        severity={snackbar.severity}
      />
    </>
  );
};

export default UserInfo;
