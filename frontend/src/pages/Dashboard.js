import React, { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import Logo from "@components/logo/Logo";
import { useTheme } from "@mui/material/styles";
import SideBarMenuList from "@components/side-bar/SideBarMenuList";
import { ReactComponent as MinimizeMenuIcon } from "@assets/images/icon-minimize-menu.svg";
import OverviewContent from "@pages/OverviewContent";
import TransactionsContent from "@pages/TransactionsContent";
import BudgetsContent from "@pages/BudgetsContent";
import PotsContent from "@pages/PotsContent";
import RecurringBillsContent from "@pages/RecurringBillsContent";
import { useMenu } from "@context/MenuContext";

/**
 * **Dashboard Component**
 *
 * Questo componente rappresenta la vista principale della dashboard, suddivisa in due sezioni principali:
 *
 * 1. **Sidebar (sidebar-container)**:
 *    - Contiene il logo, il menu laterale e il pulsante per minimizzare la sidebar.
 *    - Può essere minimizzata per risparmiare spazio su schermi grandi.
 *    - È responsiva e si adatta a schermi piccoli diventando "fixed" nella parte inferiore dello schermo.
 *
 * 2. **Main Content (main-content)**:
 *    - Visualizza il contenuto dinamico in base alla voce di menu selezionata.
 *    - Supporta diverse viste come "Overview", "Transactions", "Budgets", "Pots", e "Recurring Bills".
 *    - Implementa uno scroll verticale personalizzato per gestire grandi quantità di contenuti.
 *
 * ### Stato e Logica:
 * - **isSidebarMinimized (booleano)**:
 *   - Gestisce lo stato di minimizzazione della sidebar.
 *   - Cambia tramite il pulsante di minimizzazione ed è disabilitato su schermi piccoli.
 * - **activeMenu (dal contesto MenuContext)**:
 *   - Determina quale vista deve essere visualizzata nel contenuto principale.
 * - **userToken**:
 *   - Recuperato dal `localStorage`, è utilizzato per autorizzare il contenuto dinamico.
 *
 * ### Responsività:
 * - **Breakpoints Material-UI**:
 *   - Su schermi piccoli (`xs`), la sidebar si sposta in basso e diventa "fixed".
 *   - Su schermi medi (`md` e superiori), la sidebar è visibile lateralmente con la possibilità di minimizzarla.
 * - **Flexbox**:
 *   - Il layout principale utilizza `display: flex` con `flexDirection` dinamico per adattarsi a schermi piccoli (colonna) e grandi (riga).
 *
 * ### Stile:
 * - **Sidebar**:
 *   - Ha un'animazione di transizione per la larghezza durante la minimizzazione.
 *   - Il pulsante di minimizzazione include un'icona che ruota con un effetto visivo.
 * - **Main Content**:
 *   - Padding e margini dinamici per migliorare l'esperienza su dispositivi diversi.
 *   - Include `overflowY: auto` per abilitare uno scroll verticale personalizzato.
 *
 * ### Funzionalità principali:
 * - **Minimizzazione della Sidebar**:
 *   - Permette di risparmiare spazio su schermi grandi.
 *   - Impedisce la minimizzazione su dispositivi mobili.
 * - **Contenuto Dinamico**:
 *   - Cambia in base alla voce del menu selezionata tramite il contesto `MenuContext`.
 *
 * ### Componenti utilizzati:
 * - **Logo**: Visualizza un logo dinamico che cambia in base allo stato della sidebar.
 * - **SideBarMenuList**: Mostra il menu laterale con le voci selezionabili.
 * - **OverviewContent, TransactionsContent, BudgetsContent, PotsContent, RecurringBillsContent**:
 *   - Componenti che rappresentano le diverse viste della dashboard.
 *
 * ### Note tecniche:
 * - `useEffect`: Resetta lo stato di `isSidebarMinimized` quando si passa a un breakpoint inferiore a `md`.
 * - `useMediaQuery`: Verifica se lo schermo è più grande di `md` per abilitare la minimizzazione.
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
        height: "100vh",
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
          overflowY: "auto",
        }}>
        {activeMenu === 1 && <OverviewContent token={userToken} />}
        {activeMenu === 2 && <TransactionsContent token={userToken} />}
        {activeMenu === 3 && <BudgetsContent token={userToken} />}
        {activeMenu === 4 && <PotsContent token={userToken} />}
        {activeMenu === 5 && <RecurringBillsContent token={userToken} />}
      </Box>
    </Box>
  );
};

export default Dashboard;
