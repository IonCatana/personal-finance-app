import React from "react";
import { Box, Typography } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import Logo from "@components/logo/Logo";
import { useTheme } from "@mui/material/styles";

/**
 * IllustrationSection
 * -------------------------------
 * Questo componente rappresenta una sezione illustrativa progettata per dispositivi
 * con larghezza superiore a 900px. È utilizzata per visualizzare un'immagine
 * d'illustrazione, un logo, un titolo e una descrizione.
 *
 * Funzionalità:
 * - Mostra un'immagine di illustrazione con un bordo arrotondato.
 * - Include un logo posizionato in alto a sinistra.
 * - Visualizza un titolo e una descrizione posizionati in basso.
 * - È visibile solo su dispositivi con larghezza superiore a 900px.
 *
 * Props:
 * - illustrationSrc (string, obbligatoria): Percorso o URL dell'immagine illustrativa.
 * - title (string, obbligatoria): Testo del titolo visualizzato nella sezione.
 * - description (string, obbligatoria): Testo descrittivo visualizzato sotto il titolo.
 *
 * Uso:
 * - Ideale per sezioni laterali di pagine di login o registrazione per fornire contesto visivo.
 *
 * Esempio:
 * <IllustrationSection
 *   illustrationSrc="/path/to/image.png"
 *   title="Welcome Back!"
 *   description="Manage your finances with ease."
 * />
 */
const IllustrationSection = ({ illustrationSrc, title, description }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" }, // Visibile solo sopra i 900px
        maxWidth: pxToRem(600),
        width: "100%",
        flexDirection: "column",
        backgroundColor: "#F2F3F7",
        padding: pxToRem(20),
        position: "relative",
      }}>
      {/* Immagine illustrativa */}
      <Box
        component="img"
        src={illustrationSrc}
        alt="Illustration"
        sx={{ width: "100%", borderRadius: pxToRem(12) }}
      />

      {/* Logo posizionato in alto a sinistra */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          position: "absolute",
          top: pxToRem(0),
          left: pxToRem(0),
          width: "100%",
          height: pxToRem(21.76),
          zIndex: 1000,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            position: "absolute",
            top: pxToRem(60),
            left: pxToRem(60),
            zIndex: 1000,
          }}>
          <Logo type="large" />
        </Box>
      </Box>

      {/* Contenuto posizionato in basso */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          padding: `${pxToRem(0)} ${pxToRem(60)} ${pxToRem(60)}`,
        }}>
        {/* Titolo */}
        <Typography
          variant="h1"
          sx={{
            typography: "textPreset1",
            color: theme.palette.otherColors.white,
            marginBottom: pxToRem(24),
          }}>
          {title}
        </Typography>

        {/* Descrizione */}
        <Box
          sx={{
            typography: "textPreset4",
            color: theme.palette.otherColors.white,
          }}>
          {description}
        </Box>
      </Box>
    </Box>
  );
};

export default IllustrationSection;
