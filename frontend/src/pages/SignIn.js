import React from "react";
import { Box, Typography } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import loginIllustration from "@assets/images/illustration-authentication.svg";
import IllustrationSection from "@components/shared/IllustrationSection";
import SignInForm from "@components/forms/SignInForm";
import HeaderLogo from "@components/header/HeaderLogo";
import { useTheme } from "@mui/material/styles";

/**
 * **Pagina SignIn**
 *
 * Questa pagina è dedicata alla funzionalità di accesso per l'applicazione. Combina una sezione illustrativa e un modulo
 * di login per migliorare l'esperienza utente.
 *
 * ### Funzionalità principali:
 *
 * 1. **HeaderLogo**:
 *    - Visualizza il logo dell'app in cima alla pagina, garantendo un branding coerente.
 *
 * 2. **Illustrazione (IllustrationSection)**:
 *    - Mostra un'immagine motivazionale con un titolo e una descrizione per comunicare il valore dell'app all'utente.
 *    - L'immagine utilizzata è `illustration-authentication.svg`.
 *
 * 3. **SignInForm**:
 *    - Modulo per l'accesso degli utenti.
 *    - Include campi per l'inserimento di credenziali come email e password.
 *
 * ### Stile e layout:
 * - Utilizza Material-UI per il layout e lo stile, integrato con un tema personalizzato tramite l'hook `useTheme`.
 * - **Box principale**:
 *   - Centra il contenuto verticalmente e orizzontalmente con `flexbox`.
 *   - Adatta i padding in base al dispositivo (responsività con `xs` e `md`).
 * - **Illustrazione e modulo**:
 *   - Divisi in due sezioni principali.
 *   - L'illustrazione occupa metà dello spazio disponibile, mentre il modulo è centrato con una larghezza massima.
 * - **Tema personalizzato**:
 *   - Usa il tema per gestire colori, tipografia e spaziature, come il colore bianco di sfondo e i margini definiti.
 *
 * ### Note:
 * - Il modulo è contenuto in un box con un bordo arrotondato e sfondo bianco, per un aspetto moderno e pulito.
 * - Le dimensioni e i margini sono convertiti in rem tramite la funzione `pxToRem`, per garantire una migliore scalabilità.
 */

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
                Login
              </Typography>
              <SignInForm />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignIn;
