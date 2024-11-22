import React, { useState } from "react";
import {
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { pxToRem } from "@utils/pxToRem";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import BasicInput from "@components/inputFields/BasicInput";
import { useTheme } from "@mui/material/styles";
import showPasswordIcon from "@assets/images/icon-show-password.svg";
import hidePasswordIcon from "@assets/images/icon-hide-password.svg";

const SignUpForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mostra o nasconde la password al clic sull'icona.
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  // Evita il comportamento predefinito quando si clicca sull'icona.
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          username,
          email,
          password,
        }
      );

      console.log("SignUp successful:", response.data.message);

      // Mostra la modale
      setIsModalOpen(true);
    } catch (error) {
      setError(
        error.response?.data?.error || "Errore durante la registrazione."
      );
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Aggiungi una validazione istantanea
    if (!validateEmail(value)) {
      setError("Inserisci un'email valida.");
    } else {
      setError("");
    }
  };

  return (
    <Box
      id="signup-form"
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      {/* Campo di input per il nome */}
      <BasicInput
        label="Name"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
        autoComplete="name"
        errorText="Inserisci un nome valido"
        sx={{ marginBottom: pxToRem(16) }}
      />

      {/* Campo di input per l'email */}
      <BasicInput
        label="Email"
        value={email}
        type="email"
        onChange={handleEmailChange}
        autoComplete="email"
        errorText="Inserisci un'email valida"
        sx={{ marginBottom: pxToRem(16) }}
      />

      {/* Campo di input per la password */}
      <BasicInput
        label="Create Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
        type={showPassword ? "text" : "password"}
        infoText="Passwords must be at least 8 characters"
        endIcon={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end">
              <img
                src={showPassword ? hidePasswordIcon : showPasswordIcon}
                alt={showPassword ? "Nascondi password" : "Mostra password"}
                style={{ width: pxToRem(16), height: pxToRem(16) }}
              />
            </IconButton>
          </InputAdornment>
        }
        sx={{ marginBottom: pxToRem(32) }}
      />

      {/* Error Message */}
      {error && (
        <Typography
          sx={{
            color: theme.palette.secondaryColors.red,
            typography: "textPreset4",
            marginBottom: pxToRem(16),
          }}>
          {error}
        </Typography>
      )}

      {/* Pulsante per inviare il modulo */}
      <ButtonPrimary
        type="submit"
        sx={{ width: "100%", marginBottom: pxToRem(32) }}>
        Create Account
      </ButtonPrimary>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description">
        <DialogTitle id="modal-title">Registrazione completata</DialogTitle>
        <DialogContent>
          <Typography id="modal-description">
            Account creato con successo!
          </Typography>
        </DialogContent>
        <DialogActions>
          <ButtonPrimary
            onClick={() => navigate("/signin")}
            color="primary"
            variant="contained">
            OK
          </ButtonPrimary>
        </DialogActions>
      </Dialog>

      {/* Link per accedere se si possiede già un account */}
      <Typography
        sx={{
          typography: "textPreset4",
          color: theme.palette.grey[500],
        }}
        align="center">
        Already have an account?
        <Link
          to="/signin"
          style={{
            marginLeft: pxToRem(8),
            typography: "textPreset4Bold",
            fontWeight: "bold",
            lineHeight: 1.5,
            color: theme.palette.grey[900],
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}>
          Login
        </Link>
      </Typography>
    </Box>
  );
};

export default SignUpForm;
