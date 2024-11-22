import React, { useState } from "react";
import { Box, Typography, InputAdornment, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { pxToRem } from "@utils/pxToRem";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import BasicInput from "@components/inputFields/BasicInput";
import { useTheme } from "@mui/material/styles";
import showPasswordIcon from "@assets/images/icon-show-password.svg";
import hidePasswordIcon from "@assets/images/icon-hide-password.svg";

/**
 * SignUpForm
 * -------------------------------
 * Questo componente rappresenta il modulo di registrazione per l'applicazione.
 * Permette agli utenti di creare un account inserendo nome, email e password.
 *
 * Funzionalità:
 * - Gestione dinamica dell'input (nome, email e password).
 * - Possibilità di mostrare/nascondere la password tramite un'icona.
 * - Invio del modulo con validazione base e gestione della logica di registrazione.
 * - Link per il login per gli utenti già registrati.
 *
 * Stato:
 * - name: Stato per memorizzare il nome.
 * - email: Stato per memorizzare l'input dell'email.
 * - password: Stato per memorizzare l'input della password.
 * - showPassword: Stato per determinare se mostrare o nascondere la password.
 *
 * Uso:
 * - Importare e utilizzare nella pagina di registrazione (`/signup`).
 *
 * Esempio:
 * <SignUpForm />
 */
const SignUpForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Mostra o nasconde la password al clic sull'icona.
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  // Evita il comportamento predefinito quando si clicca sull'icona.
  const handleMouseDownPassword = (event) => event.preventDefault();

  /**
   * Gestisce l'invio del modulo.
   * Per ora, stampa il nome, l'email e la password nella console.
   * Questa logica può essere estesa per inviare i dati al backend.
   */
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

      // No need to store the token or set authentication state
      // localStorage.setItem("token", response.data.token);

      // Navigate to the sign-in page
      navigate("/signin");
    } catch (error) {
      setError(
        error.response?.data?.error || "Errore durante la registrazione."
      );
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
        onChange={(e) => setEmail(e.target.value)}
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
          sx={{ color: theme.palette.error.main, marginBottom: pxToRem(16) }}>
          {error}
        </Typography>
      )}

      {/* Pulsante per inviare il modulo */}
      <ButtonPrimary
        type="submit"
        sx={{ width: "100%", marginBottom: pxToRem(32) }}>
        Create Account
      </ButtonPrimary>

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
