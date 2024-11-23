import React, { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import Logo from "@components/logo/Logo";
import { useTheme } from "@mui/material/styles";
import SideBarMenuList from "@components/side-bar/SideBarMenuList";
import { ReactComponent as MinimizeMenuIcon } from "@assets/images/icon-minimize-menu.svg";
import OverviewContent from "@pages/Overview";
import TransactionsContent from "@pages/Transactions";
import BudgetsContent from "@pages/Budgets";
import PotsContent from "@pages/Pots";
import RecurringBillsContent from "@pages/RecurringBills";
import { useMenu } from "@context/MenuContext";

/**
 * Dashboard Component
 * -------------------------------
 * Questo componente rappresenta la dashboard principale dell'applicazione, composta da:
 * - Una barra laterale (sidebar) che include un logo, un menu, e un'icona per minimizzare la barra.
 * - Una sezione principale che mostra il contenuto basato sul menu attualmente selezionato.
 *
 * Funzionalità principali:
 * - Supporta la minimizzazione della barra laterale per migliorare l'usabilità su schermi grandi.
 * - Gestisce dinamicamente i contenuti mostrati nella sezione principale in base al menu attivo.
 * - Adatta il layout per dispositivi mobili utilizzando Media Queries di Material-UI.
 *
 * Stato:
 * - `isSidebarMinimized` (boolean): Determina se la barra laterale è minimizzata.
 * - Utilizza il contesto `MenuContext` per gestire il menu attivo e cambiare i contenuti principali.
 *
 * Hooks:
 * - `useMediaQuery`: Per rilevare se lo schermo è grande (breakpoint "md").
 * - `useTheme`: Per accedere al tema Material-UI e ai colori globali.
 * - `useEffect`: Per resettare lo stato `isSidebarMinimized` quando lo schermo diventa piccolo.
 *
 * Componenti utilizzati:
 * - `Logo`: Mostra il logo dell'applicazione in versione grande o piccola.
 * - `SideBarMenuList`: Un menu interattivo con più opzioni per navigare tra le sezioni.
 * - Contenuti dinamici (es. `OverviewContent`, `TransactionsContent`, ecc.) per ciascun menu.
 *
 * Esempio di utilizzo:
 * ```jsx
 * <Dashboard />
 * ```
 */

const Dashboard = () => {
  const theme = useTheme();
  const { activeMenu, setActiveMenu } = useMenu();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const userToken = localStorage.getItem("token");
  // Effetto per resettare isSidebarMinimized quando isLargeScreen diventa false
  useEffect(() => {
    if (!isLargeScreen) {
      setIsSidebarMinimized(false);
    }
  }, [isLargeScreen]);
  // Funzione per gestire il clic sul pulsante di minimizzazione
  const handleMinimizeClick = () => {
    // Permetti la minimizzazione solo se lo schermo è grande
    if (isLargeScreen) {
      setIsSidebarMinimized(!isSidebarMinimized);
    }
  };

  return (
    <Box
      className="dashboard"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        position: "relative",
      }}>
      <Box
        className="sidebar-container"
        sx={{
          borderRadius: {
            xs: `${pxToRem(8)} ${pxToRem(8)} ${pxToRem(0)} ${pxToRem(0)}`,
            md: `${pxToRem(0)} ${pxToRem(16)} ${pxToRem(16)} ${pxToRem(0)}`,
          },
          padding: {
            xs: `${pxToRem(8)} ${pxToRem(16)} ${pxToRem(0)} ${pxToRem(16)}`,
            sm: `${pxToRem(8)} ${pxToRem(40)} ${pxToRem(0)} ${pxToRem(40)}`,
            md: `${pxToRem(0)} `,
          },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          maxWidth: {
            xs: isSidebarMinimized ? "100%" : "100%",
            md: isSidebarMinimized ? pxToRem(88) : pxToRem(300),
          },
          width: "100%",
          height: { xs: pxToRem(74), md: "100%" },
          backgroundColor: theme.palette.grey[900],
          position: { xs: "fixed", md: "relative" },
          bottom: { xs: 0, md: "auto" },
          left: { xs: 0, md: "auto" },
          zIndex: 99,
          transition: "max-width 0.3s",
        }}>
        <Logo
          type={isSidebarMinimized ? "small" : "large"}
          sx={{
            display: { xs: "none", md: "block" },
            margin: isSidebarMinimized
              ? `${pxToRem(40)}  ${pxToRem(32)} ${pxToRem(40)} ${pxToRem(32)}`
              : `${pxToRem(40)}  ${pxToRem(32)}`,
          }}
        />
        <SideBarMenuList
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          isSidebarMinimized={isSidebarMinimized}
        />
        <Box
          className="minimize-menu-container"
          onClick={handleMinimizeClick}
          sx={{
            margin: `${pxToRem(24)} ${pxToRem(0)} ${pxToRem(58.24)} ${pxToRem(
              0
            )}`,
            padding: isSidebarMinimized
              ? `${pxToRem(16)} ${pxToRem(16)}`
              : `${pxToRem(16)} ${pxToRem(32)}`,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: isSidebarMinimized ? "center" : "flex-start",
            gap: pxToRem(16),
            cursor: "pointer",
          }}>
          <MinimizeMenuIcon
            className="minimize-menu"
            style={{
              transform: isSidebarMinimized ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          />
          {!(isSidebarMinimized || !isLargeScreen) && (
            <p
              style={{
                whiteSpace: "nowrap",
              }}>
              Minimize Menu
            </p>
          )}
        </Box>
      </Box>
      <Box
        className="main-content"
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          height: { xs: "calc(100% - 74px)", md: "100%" },
          marginBottom: { xs: pxToRem(74), sm: pxToRem(74), md: pxToRem(0) },
          padding: {
            xs: `${pxToRem(24)} ${pxToRem(16)}`,
            sm: `${pxToRem(32)} ${pxToRem(40)}`,
            md: `${pxToRem(32)} ${pxToRem(40)} `,
          },
        }}>
        {activeMenu === 1 && <OverviewContent token={userToken} />}
        {activeMenu === 2 && <TransactionsContent />}
        {activeMenu === 3 && <BudgetsContent />}
        {activeMenu === 4 && <PotsContent token={userToken} />}
        {activeMenu === 5 && <RecurringBillsContent />}
      </Box>
    </Box>
  );
};

export default Dashboard;
