import React, { useState } from "react";
import { Box, InputAdornment, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import BasicInput from "@components/inputFields/BasicInput";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import showPasswordIcon from "@assets/images/icon-show-password.svg";
import hidePasswordIcon from "@assets/images/icon-hide-password.svg";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import { useToken } from "@context/TokenContext";
import apiClient from "@utils/apiClient";

/**
 * **SignInForm Component**
 *
 * Questo componente gestisce il modulo di login dell'utente.
 *
 * **Funzionalità principali**:
 * - **Gestione dell'input**:
 *   - Acquisisce email e password dall'utente tramite campi di input controllati.
 *   - Mostra o nasconde la password al clic sull'icona corrispondente.
 * - **Autenticazione tramite API**:
 *   - Invia una richiesta POST al backend per autenticare l'utente.
 *   - In caso di successo, salva il token di autenticazione tramite il `TokenContext` e reindirizza alla pagina principale.
 *   - Gestisce eventuali errori mostrando un messaggio di errore all'utente.
 * - **UI/UX migliorata**:
 *   - Utilizza componenti predefiniti come `BasicInput` e `ButtonPrimary` per mantenere uno stile coerente.
 *   - Fornisce un link per la creazione di un nuovo account.
 *
 * **Hook e librerie utilizzati**:
 * - **useState**: Per gestire lo stato dei campi di input, la visibilità della password e gli errori.
 * - **useNavigate** (da `react-router-dom`): Per navigare programmaticamente tra le pagine.
 * - **axios**: Per gestire la richiesta API al backend.
 * - **useToken** (dal `TokenContext`): Per salvare il token di autenticazione e gestire lo stato dell'utente.
 *
 * **Esempio di utilizzo**:
 * Il componente può essere utilizzato in una pagina di login come segue:
 * ```javascript
 * import SignInForm from './SignInForm';
 *
 * const LoginPage = () => (
 *   <div>
 *     <h1>Login</h1>
 *     <SignInForm />
 *   </div>
 * );
 * ```
 *
 * **Comportamento personalizzabile**:
 * - I componenti di input (`BasicInput`) e pulsanti (`ButtonPrimary`) possono essere personalizzati per adattarsi al design del progetto.
 * - È possibile configurare l'URL del backend e il token tramite il modulo di API Client centralizzato.
 *
 * **Stati gestiti**:
 * - `email`: Contiene l'email dell'utente.
 * - `password`: Contiene la password dell'utente.
 * - `showPassword`: Booleano per gestire la visibilità della password.
 * - `error`: Messaggio di errore in caso di autenticazione fallita.
 */

const SignInForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { saveToken } = useToken();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/auth/signin`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await apiClient.post(apiUrl, {
        email,
        password,
      });

      // console.log("Login successful, token received:", response.data.token);
      saveToken(response.data.token);

      navigate("/");
    } catch (error) {
      setError(error.response?.data?.error || "Error during authentication.");
    }
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
        errorText="Please enter a valid email"
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

      {/* Messaggio di errore */}
      {error && (
        <Typography
          sx={{ color: theme.palette.error.main, marginBottom: pxToRem(16) }}>
          {error}
        </Typography>
      )}

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
              marginLeft: pxToRem(8),
              typography: "textPreset4Bold",
              fontWeight: "bold",
              lineHeight: 1.5,
              color: theme.palette.grey[900],
              textDecoration: "underline",
              textUnderlineOffset: pxToRem(3),
            }}>
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignInForm;
