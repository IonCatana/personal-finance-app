import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

/**
 * SideBarMenu
 * -------------------------------
 * Questo componente rappresenta un singolo elemento del menu laterale (sidebar).
 * È progettato per adattarsi a diverse modalità, come una sidebar minimizzata
 * o espansa, e supporta stati attivi per evidenziare l'elemento selezionato.
 *
 * Funzionalità:
 * - Supporta un'icona e un'etichetta (testo) per l'elemento del menu.
 * - Cambia lo stile in base allo stato attivo (`active`).
 * - Adatta il layout alla modalità minimizzata o espansa della sidebar.
 * - Include una transizione fluida per colore e margini.
 *
 * Props:
 * - label (string, obbligatoria): Testo visualizzato accanto all'icona.
 * - icon (node, obbligatoria): Icona visualizzata accanto al testo.
 * - active (bool, opzionale): Stato attivo dell'elemento del menu.
 * - onClick (function, opzionale): Funzione chiamata al clic sull'elemento.
 * - isSidebarMinimized (bool, obbligatoria): Indica se la sidebar è minimizzata.
 *
 * Uso:
 * - Importare e utilizzare per costruire menu laterali.
 *
 * Esempio:
 * <SideBarMenu
 *   label="Dashboard"
 *   icon={<DashboardIcon />}
 *   active={true}
 *   onClick={() => console.log("Naviga al dashboard")}
 *   isSidebarMinimized={false}
 * />
 */
const SideBarMenu = ({ label, icon, active, onClick, isSidebarMinimized }) => {
  const theme = useTheme();

  return (
    <Box
      className="sidebar-menu"
      sx={{
        display: "flex",
        alignItems: "center",
        padding: {
          xs: `${pxToRem(8)} ${pxToRem(22.3)} ${pxToRem(12)} ${pxToRem(22.3)}`,
          sm: `${pxToRem(8)} ${pxToRem(25.5)} ${pxToRem(12)} ${pxToRem(25.5)}`,
          md: isSidebarMinimized
            ? `${pxToRem(16)} ${pxToRem(24)} ${pxToRem(16)} ${pxToRem(32)}`
            : `${pxToRem(16)} ${pxToRem(24)} ${pxToRem(16)} ${pxToRem(32)}`,
        },
        backgroundColor: active ? theme.palette.beige[100] : "transparent",
        color: active ? theme.palette.grey[900] : theme.palette.grey[500],
        borderRadius: {
          xs: active
            ? `${pxToRem(8)} ${pxToRem(8)} ${pxToRem(0)} ${pxToRem(0)}`
            : `${pxToRem(8)} ${pxToRem(8)} ${pxToRem(0)} ${pxToRem(0)}`,
          md: active
            ? `${pxToRem(0)} ${pxToRem(12)} ${pxToRem(12)} ${pxToRem(0)}`
            : `${pxToRem(8)} ${pxToRem(8)} ${pxToRem(0)} ${pxToRem(0)}`,
        },
        marginRight: {
          xs: `${pxToRem(0)}`,
          md: isSidebarMinimized ? `${pxToRem(8)}` : `${pxToRem(24)}`,
        },
        transition: "color 0.3s ease, margin-right 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          color: active ? theme.palette.grey[900] : theme.palette.grey[100],
        },
        justifyContent: isSidebarMinimized ? "flex-start" : "flex-start",
        minHeight: pxToRem(56),
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          height: {
            xs: pxToRem(4),
            md: "100%",
          },
          width: {
            xs: "100%",
            md: pxToRem(4),
          },
          bottom: {
            xs: 0,
            md: "unset",
          },
          top: {
            xs: "unset",
            md: 0,
          },
          left: {
            xs: 0,
            md: 0,
          },
          right: {
            xs: "unset",
            md: "unset",
          },
          backgroundColor: active
            ? theme.palette.secondaryColors.green
            : "transparent",
        },
      }}
      onClick={onClick}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: pxToRem(4), md: pxToRem(16) },
        }}>
        {/* Icona dell'elemento */}
        <Box
          className="sidebar-menu-icon"
          sx={{
            width: pxToRem(24),
            height: pxToRem(24),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          {icon}
        </Box>

        {/* Etichetta visibile solo se la sidebar non è minimizzata */}
        {!isSidebarMinimized && (
          <Typography
            sx={{
              typography: { xs: "textPreset5Bold", md: "textPreset3" },
              whiteSpace: "nowrap",
              display: { xs: "none", md: "block", sm: "block" },
            }}>
            {label}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

SideBarMenu.propTypes = {
  label: PropTypes.string.isRequired, // Testo dell'elemento del menu
  icon: PropTypes.node.isRequired, // Icona associata all'elemento
  active: PropTypes.bool, // Stato attivo del menu
  onClick: PropTypes.func, // Funzione chiamata al clic
  isSidebarMinimized: PropTypes.bool.isRequired, // Stato minimizzato della sidebar
};

export default SideBarMenu;
