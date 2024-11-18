// src/pages/SignIn.js

import React from "react";
import { Box, Typography } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import loginIllustration from "@assets/images/illustration-authentication.svg";
import IllustrationSection from "@components/shared/IllustrationSection";
import SignUpForm from "@components/forms/SignUpForm";
import HeaderLogo from "@components/header/HeaderLogo";
import { useTheme } from "@mui/material/styles";

const SignIn = () => {
  const theme = useTheme();

  const commonBoxStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      <HeaderLogo />
      <Box
        sx={{
          ...commonBoxStyles,
          minHeight: "100vh",
          padding: {
            xs: `${pxToRem(20)} ${pxToRem(16)}`,
            md: `${pxToRem(0)} ${pxToRem(20)}`,
          },
        }}>
        <Box sx={{ display: "flex", width: "100%", overflow: "hidden" }}>
          <IllustrationSection
            illustrationSrc={loginIllustration}
            title="Keep track of your money and save for your future"
            description="Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to savings pots easily."
          />
          <Box
            sx={{
              ...commonBoxStyles,
              maxWidth: pxToRem(840),
              width: "100%",
              flexDirection: "column",
              padding: {
                xs: `${pxToRem(32)} ${pxToRem(0)}`,
                md: `${pxToRem(12)} ${pxToRem(40)}`,
              },
            }}>
            <Box
              sx={{
                maxWidth: pxToRem(560),
                width: "100%",
                backgroundColor: theme.palette.otherColors.white,
                padding: {
                  xs: `${pxToRem(24)} ${pxToRem(20)}`,
                  sm: `${pxToRem(32)} `,
                  md: `${pxToRem(32)} `,
                },
                borderRadius: pxToRem(12),
              }}>
              <Typography
                sx={{
                  typography: "textPreset1",
                  color: theme.palette.grey[900],
                  marginBottom: pxToRem(32),
                }}>
                Sign Up
              </Typography>
              <SignUpForm />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignIn;
