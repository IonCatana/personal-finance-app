import React from "react";
import { Box, Typography } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import loginIllustration from "@assets/images/illustration-authentication.svg";
import IllustrationSection from "@components/shared/IllustrationSection";
import SignUpForm from "@components/forms/SignUpForm";
import HeaderLogo from "@components/header/HeaderLogo";
import { useTheme } from "@mui/material/styles";

/**
 * **Pagina SignUp**
 *
 * Questa pagina è dedicata alla funzionalità di registrazione degli utenti per l'applicazione.
 * Combina una sezione illustrativa e un modulo di registrazione, offrendo un layout moderno e responsivo.
 *
 * ### Funzionalità principali:
 *
 * 1. **HeaderLogo**:
 *    - Visualizza il logo dell'app nella parte superiore della pagina.
 *    - Garantisce continuità nel branding dell'app.
 *
 * 2. **Illustrazione (IllustrationSection)**:
 *    - Include un'immagine illustrativa con un titolo e una descrizione motivazionale.
 *    - L'illustrazione comunica il valore dell'app per l'utente finale.
 *
 * 3. **SignUpForm**:
 *    - Modulo per la registrazione di nuovi utenti.
 *    - Comprende campi per l'inserimento delle informazioni richieste per creare un account.
 *
 * ### Stile e layout:
 * - Utilizza Material-UI per il design e il layout, sfruttando un tema personalizzato con l'hook `useTheme`.
 * - **Box principale**:
 *   - Centra il contenuto orizzontalmente e verticalmente con `flexbox`.
 *   - Applica padding dinamico basato sulla dimensione dello schermo, assicurando responsività.
 * - **Sezione modulo e illustrazione**:
 *   - L'illustrazione occupa metà dello spazio disponibile, con contenuto visivamente accattivante.
 *   - Il modulo di registrazione è centrato e racchiuso in un contenitore bianco arrotondato.
 *
 * ### Dettagli tecnici:
 * - **pxToRem**: Convertitore di unità per garantire scalabilità e accessibilità del layout.
 * - **Tema personalizzato**:
 *   - Colori, tipografia e spaziature sono gestiti attraverso il tema Material-UI.
 * - **Responsività**:
 *   - Margini e padding sono configurati per adattarsi a dispositivi mobili e desktop.
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
