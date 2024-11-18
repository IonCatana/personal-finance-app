import React, { useState } from "react";
import { Box, Typography, InputAdornment, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { pxToRem } from "@utils/pxToRem";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import BasicInput from "@components/inputFields/BasicInput";
import { useTheme } from "@mui/material/styles";
import showPasswordIcon from "@assets/images/icon-show-password.svg";
import hidePasswordIcon from "@assets/images/icon-hide-password.svg";

const SignUpForm = () => {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logica per la gestione del form di iscrizione
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
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
      <BasicInput
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
        errorText="Inserisci un nome valido"
        sx={{ marginBottom: pxToRem(16) }}
      />
      <BasicInput
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        errorText="Inserisci un'email valida"
        sx={{ marginBottom: pxToRem(16) }}
      />
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
      <ButtonPrimary
        type="submit"
        sx={{ width: "100%", marginBottom: pxToRem(32) }}>
        Create Account
      </ButtonPrimary>
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
