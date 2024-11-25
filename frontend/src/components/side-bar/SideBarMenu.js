import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { pxToRem } from "@utils/pxToRem";
import { useTheme } from "@mui/material/styles";

/**
 * **Componente SideBarMenu**
 *
 * Questo componente rappresenta un singolo elemento del menu nella sidebar.
 * È altamente personalizzabile, responsivo e cambia aspetto in base a diverse condizioni come lo stato attivo
 * e la minimizzazione della sidebar.
 *
 * ### **Props**
 * - **label (string)**:
 *   - Testo che rappresenta l'etichetta dell'elemento del menu.
 * - **icon (node)**:
 *   - Icona visiva associata all'elemento del menu.
 * - **active (boolean)**:
 *   - Indica se l'elemento è attualmente attivo (selezionato).
 *   - Quando attivo, l'elemento cambia colore e visualizza un indicatore visivo.
 * - **onClick (function)**:
 *   - Funzione chiamata quando l'elemento viene cliccato.
 * - **isSidebarMinimized (boolean)**:
 *   - Indica se la sidebar è minimizzata.
 *   - Determina se l'etichetta del menu deve essere visibile o nascosta.
 *
 * ### **Stile e Layout**
 * - **Contenitore principale (`sidebar-menu`)**:
 *   - Utilizza `flexbox` per allineare l'icona e l'etichetta orizzontalmente o verticalmente, in base al breakpoint.
 *   - Cambia il colore e lo sfondo quando l'elemento è attivo.
 *   - Aggiunge un effetto hover per migliorare l'interazione.
 * - **Icona (`sidebar-menu-icon`)**:
 *   - Mostra l'icona dell'elemento.
 *   - Sempre visibile, indipendentemente dallo stato di minimizzazione.
 * - **Etichetta (`Typography`)**:
 *   - Visualizzata solo quando la sidebar non è minimizzata.
 *   - Supporta una tipografia dinamica per adattarsi ai diversi breakpoints.
 *
 * ### **Responsività**
 * - Su schermi piccoli (`xs`):
 *   - L'etichetta è nascosta e l'elemento è più compatto.
 * - Su schermi medi e grandi (`md` e superiori):
 *   - L'etichetta è visibile a meno che la sidebar non sia minimizzata.
 *
 * ### **Interazioni**
 * - **Hover**:
 *   - Cambia il colore del testo per gli elementi non attivi.
 * - **Stato attivo**:
 *   - Cambia colore e visualizza un indicatore visivo (barra colorata sul lato o sotto l'elemento, in base al layout).
 *
 * ### **Indicatori Visivi**
 * - Un indicatore visivo (barra) appare accanto o sotto l'elemento se è attivo.
 * - L'indicatore usa il colore `theme.palette.secondaryColors.green` per indicare lo stato attivo.
 *
 * ### **Comportamento Dinamico**
 * - La larghezza, il padding e l'aspetto cambiano dinamicamente in base ai seguenti fattori:
 *   - Stato di attivazione (`active`).
 *   - Stato di minimizzazione della sidebar (`isSidebarMinimized`).
 *   - Breakpoints definiti tramite Material-UI.
 *
 * ### **Note Tecniche**
 * - **Transizioni**:
 *   - Viene utilizzata una transizione CSS per rendere fluido il cambio di colore e margini durante le interazioni.
 * - **Accessibilità**:
 *   - L'uso di `Typography` garantisce una tipografia coerente con il resto dell'app.
 * - **Modularità**:
 *   - Questo componente può essere riutilizzato per rappresentare qualsiasi elemento di menu con un'icona e un'etichetta.
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
