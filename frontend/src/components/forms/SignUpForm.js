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

/**
 * **SignUpForm Component**
 *
 * Questo componente gestisce il modulo di registrazione per un nuovo utente.
 *
 * **Funzionalità principali**:
 * - **Gestione dell'input**:
 *   - Permette all'utente di inserire nome, email e password tramite campi di input controllati.
 *   - Include la validazione dell'email in tempo reale.
 *   - Consente di mostrare o nascondere la password al clic sull'icona corrispondente.
 * - **Registrazione tramite API**:
 *   - Invia una richiesta POST al backend per creare un nuovo account.
 *   - Gestisce errori di registrazione mostrando messaggi specifici.
 *   - Mostra una modale di conferma al completamento della registrazione con successo.
 * - **Navigazione**:
 *   - Reindirizza alla pagina di login dopo una registrazione avvenuta con successo.
 *   - Include un link per accedere se l'utente possiede già un account.
 * - **UI/UX migliorata**:
 *   - Utilizza componenti predefiniti come `BasicInput` e `ButtonPrimary` per mantenere uno stile coerente.
 *   - Mostra messaggi di errore per email non valide o password non conformi.
 *
 * **Hook e librerie utilizzati**:
 * - **useState**: Per gestire lo stato dei campi di input, la visibilità della password, gli errori e lo stato della modale.
 * - **useNavigate** (da `react-router-dom`): Per navigare programmaticamente alla pagina di login.
 * - **axios**: Per gestire la richiesta API al backend.
 *
 * **Esempio di utilizzo**:
 * Puoi utilizzare il componente in una pagina di registrazione come segue:
 * ```javascript
 * import SignUpForm from './SignUpForm';
 *
 * const SignUpPage = () => (
 *   <div>
 *     <h1>Create an Account</h1>
 *     <SignUpForm />
 *   </div>
 * );
 * ```
 *
 * **Campi di input**:
 * - **Name**: Campo per il nome dell'utente.
 * - **Email**: Campo per l'indirizzo email con validazione in tempo reale.
 * - **Create Password**: Campo per la password con requisiti di sicurezza (minimo 8 caratteri).
 *
 * **Stati gestiti**:
 * - `username`: Contiene il nome dell'utente.
 * - `email`: Contiene l'email dell'utente.
 * - `password`: Contiene la password inserita dall'utente.
 * - `showPassword`: Booleano per gestire la visibilità della password.
 * - `error`: Messaggio di errore in caso di validazione fallita o registrazione non riuscita.
 * - `isModalOpen`: Booleano per gestire lo stato della modale di conferma registrazione.
 *
 * **Comportamento personalizzabile**:
 * - I componenti `BasicInput` e `ButtonPrimary` possono essere personalizzati per adattarsi al design specifico del progetto.
 * - L'URL del backend può essere configurato dinamicamente per ambienti diversi.
 *
 * **Gestione degli errori**:
 * - Mostra messaggi specifici per:
 *   - Email non valida.
 *   - Errore durante la registrazione (es. email già registrata).
 */

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
  const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password.length < 8) {
      setError("The password must contain at least 8 characters.");
      return;
    }

    try {
      const response = await axios.post(apiUrl, {
        username,
        email,
        password,
      });

      console.log("SignUp successful:", response.data.message);

      // Mostra la modale
      setIsModalOpen(true);
    } catch (error) {
      setError(error.response?.data?.error || "Error during registration.");
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Aggiungi una validazione istantanea
    if (!validateEmail(value)) {
      setError("Enter a valid email.");
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
        errorText="Enter a valid name"
        sx={{ marginBottom: pxToRem(16) }}
      />

      {/* Campo di input per l'email */}
      <BasicInput
        label="Email"
        value={email}
        type="email"
        onChange={handleEmailChange}
        autoComplete="email"
        errorText="Please enter a valid email"
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
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: pxToRem(12),
            padding: `${pxToRem(0)} ${pxToRem(0)} ${pxToRem(8)} ${pxToRem(0)}`,
          },
        }}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description">
        <DialogTitle id="modal-title">Registration completed</DialogTitle>
        <DialogContent>
          <Typography id="modal-description">
            Account successfully created!
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
          }}>
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
