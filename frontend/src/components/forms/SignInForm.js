import React, { useState } from "react";
import { Box, InputAdornment, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BasicInput from "@components/inputFields/BasicInput";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import showPasswordIcon from "@assets/images/icon-show-password.svg";
import hidePasswordIcon from "@assets/images/icon-hide-password.svg";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

const SignInForm = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logica per gestire il login
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
      <BasicInput
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        errorText="Inserisci un'email valida"
        sx={{ marginBottom: pxToRem(16) }}
      />
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
      <Box sx={{ width: "100%" }}>
        <ButtonPrimary
          type="submit"
          sx={{ width: "100%", marginBottom: pxToRem(32) }}>
          Login
        </ButtonPrimary>
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
