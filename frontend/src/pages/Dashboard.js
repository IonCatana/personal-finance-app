import React, { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import Logo from "@components/logo/Logo";
import { useTheme } from "@mui/material/styles";
import SideBarMenuList from "@components/side-bar/SideBarMenuList";
import OverviewContent from "@pages/OverviewContent";
import TransactionsContent from "@pages/TransactionsContent";
import BudgetsContent from "@pages/BudgetsContent";
import PotsContent from "@pages/PotsContent";
import RecurringBillsContent from "@pages/RecurringBillsContent";
import UserInfoContent from "@pages/UserInfoContent";
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
            position: "absolute",
            bottom: 0,
            left: 0,
            margin: `${pxToRem(24)} ${pxToRem(0)} ${pxToRem(58.24)} ${pxToRem(
              0
            )}`,
            padding: isSidebarMinimized
              ? `${pxToRem(16)} ${pxToRem(32)}`
              : `${pxToRem(16)} ${pxToRem(32)}`,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: isSidebarMinimized ? "center" : "flex-start",
            gap: pxToRem(16),
            cursor: "pointer",
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: pxToRem(20),
              height: pxToRem(20),
            }}>
            <svg
              fill="none"
              className="minimize-menu"
              height="20"
              viewBox="0 0 20 20"
              style={{
                transform: isSidebarMinimized
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
                transition: "all ease-in-out 0.3s",
              }}
              width="20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="m14.0001 5.26002v8.99998c0 .1989-.079.3897-.2197.5304-.1406.1406-.3314.2196-.5303.2196h-2.25v3.75c.0001.1484-.0438.2936-.1262.417-.0824.1235-.1996.2197-.3367.2765s-.288.0717-.4336.0427c-.14554-.029-.27923-.1005-.38412-.2056l-9.000003-9c-.069733-.0696-.125052-.1523-.162795-.2434-.037743-.09102-.05717-.18862-.05717-.28718s.019427-.19615.05717-.2872.093062-.17377.162795-.24342l9.000003-9.000004c.10489-.105009.23858-.1765346.38412-.2055224.1456-.02898777.2965-.0141343.4336.0426801.1371.0568143.2543.1530353.3367.2764803s.1263.268565.1262.416987v3.749999h2.25c.1989 0 .3897.07902.5303.21967.1407.14065.2197.33142.2197.53033zm2.25-.75c-.1989 0-.3897.07902-.5303.21967-.1407.14065-.2197.33142-.2197.53033v8.99998c0 .1989.079.3897.2197.5304.1406.1406.3314.2196.5303.2196s.3897-.079.5303-.2196c.1407-.1407.2197-.3315.2197-.5304v-8.99998c0-.19891-.079-.38968-.2197-.53033-.1406-.14065-.3314-.21967-.5303-.21967zm3 0c-.1989 0-.3897.07902-.5303.21967-.1407.14065-.2197.33142-.2197.53033v8.99998c0 .1989.079.3897.2197.5304.1406.1406.3314.2196.5303.2196s.3897-.079.5303-.2196c.1407-.1407.2197-.3315.2197-.5304v-8.99998c0-.19891-.079-.38968-.2197-.53033-.1406-.14065-.3314-.21967-.5303-.21967z"
                fill="#b3b3b3"
              />
            </svg>
          </Box>
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
        {activeMenu === 6 && <UserInfoContent token={userToken} />}
      </Box>
    </Box>
  );
};

export default Dashboard;
