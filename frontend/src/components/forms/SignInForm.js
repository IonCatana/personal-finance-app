import React, { useState } from "react";
import { Box, InputAdornment, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BasicInput from "@components/inputFields/BasicInput";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import showPasswordIcon from "@assets/images/icon-show-password.svg";
import hidePasswordIcon from "@assets/images/icon-hide-password.svg";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import { useToken } from "@context/TokenContext";

const SignInForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { saveToken } = useToken();

  //  Mostra o nasconde la password al clic sull'icona.
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  //  Evita il comportamento predefinito quando si clicca sull'icona.
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        {
          email,
          password,
        }
      );

      // console.log("Login successful, token received:", response.data.token);
      // Salva il token nel contesto
      saveToken(response.data.token);

      // Naviga alla pagina principale
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.error || "Errore durante l'autenticazione."
      );
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
