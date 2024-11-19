import React, { useState } from "react";
import { Box, InputAdornment, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BasicInput from "@components/inputFields/BasicInput";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import showPasswordIcon from "@assets/images/icon-show-password.svg";
import hidePasswordIcon from "@assets/images/icon-hide-password.svg";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

/**
 * SignInForm
 * -------------------------------
 * Questo componente rappresenta il modulo di login per l'applicazione.
 * Permette agli utenti di inserire la propria email e password per accedere.
 *
 * Funzionalità:
 * - Gestione dinamica dell'input email e password.
 * - Possibilità di mostrare/nascondere la password tramite un'icona.
 * - Invio del modulo con validazione base e gestione della logica di login.
 * - Link per la registrazione, utile per nuovi utenti.
 *
 * Stato:
 * - email: Stato per memorizzare l'input dell'email.
 * - password: Stato per memorizzare l'input della password.
 * - showPassword: Stato per determinare se mostrare o nascondere la password.
 *
 * Uso:
 * - Importare e utilizzare nella pagina di accesso (`/signin`) o in qualsiasi pagina che richieda un login.
 *
 * Esempio:
 * <SignInForm />
 */
const SignInForm = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //  Mostra o nasconde la password al clic sull'icona.
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  //  Evita il comportamento predefinito quando si clicca sull'icona.
  const handleMouseDownPassword = (event) => event.preventDefault();

  /**
   * Gestisce l'invio del modulo.
   * Per ora, stampa l'email e la password nella console.
   * Questa logica può essere estesa per inviare i dati al backend.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Box
      id="signin-form"
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
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
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="password"
        type={showPassword ? "text" : "password"}
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

      {/* Pulsante di invio */}
      <Box sx={{ width: "100%" }}>
        <ButtonPrimary
          type="submit"
          sx={{ width: "100%", marginBottom: pxToRem(32) }}>
          Login
        </ButtonPrimary>

        {/* Link per creare un nuovo account */}
        <Typography
          sx={{
            typography: "textPreset4",
            color: theme.palette.grey[500],
          }}
          align="center">
          Need to create an account?
          <Link
            to="/signup"
            style={{
              marginLeft: "8px",
              typography: "textPreset4Bold",
              fontWeight: "bold",
              lineHeight: 1.5,
              color: theme.palette.grey[900],
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}>
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignInForm;
