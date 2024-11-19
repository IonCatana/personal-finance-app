import React from "react";
import { Box } from "@mui/material";
import Logo from "@components/logo/Logo";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

/**
 * HeaderLogo
 * -------------------------------
 * Questo componente rappresenta l'header visibile solo su dispositivi mobili
 * o schermi piccoli (sotto i 900px di larghezza). Contiene il logo dell'applicazione
 * ed è posizionato in alto in modo fisso.
 *
 * Funzionalità:
 * - Mostra l'header solo su schermi piccoli (`xs` e `sm`).
 * - Visualizza il logo al centro dell'header.
 * - Include uno stile uniforme e responsivo per dispositivi mobili.
 *
 * Uso:
 * - Importare e utilizzare nella struttura dell'app (es. in un layout generale)
 *   per fornire un logo visibile sui dispositivi mobili.
 *
 * Esempio:
 * <HeaderLogo />
 */
const HeaderLogo = () => {
  const theme = useTheme();

  // Stili comuni utilizzati nei box interni
  const commonBoxStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    // Header visibile solo sotto i 900px
    <Box
      sx={{
        display: { xs: "flex", md: "none" },
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: pxToRem(70),
        padding: `${pxToRem(24)} ${pxToRem(40)}`,
        zIndex: 1000,
        alignItems: "center",
        justifyContent: "center",
      }}>
      {/* Contenitore principale dell'header */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: pxToRem(70),
          backgroundColor: theme.palette.grey[900],
          zIndex: 1000,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: `${pxToRem(0)} ${pxToRem(0)} ${pxToRem(12)} ${pxToRem(
            12
          )}`, // Bordi arrotondati nella parte inferiore
        }}>
        {/* Logo al centro dell'header */}
        <Box
          sx={{
            ...commonBoxStyles, // Stili condivisi
          }}>
          <Logo type="large" />
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderLogo;
