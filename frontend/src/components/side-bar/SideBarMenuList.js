import React from "react";
import { Box } from "@mui/material";
import { pxToRem } from "@utils/pxToRem";
import SideBarMenu from "@components/side-bar/SideBarMenu";
import { ReactComponent as HomeIcon } from "@assets/images/icon-nav-overview.svg";
import { ReactComponent as TransactionsIcon } from "@assets/images/icon-nav-transactions.svg";
import { ReactComponent as BudgetsIcon } from "@assets/images/icon-nav-budgets.svg";
import { ReactComponent as PotsIcon } from "@assets/images/icon-nav-pots.svg";
import { ReactComponent as RecurringBillsIcon } from "@assets/images/icon-nav-recurring-bills.svg";

/**
 * Array di oggetti che definisce i menu nella sidebar.
 * - `id`: Identificativo unico del menu.
 * - `label`: Testo mostrato accanto all'icona.
 * - `icon`: Icona SVG associata al menu.
 */
const menuItems = [
  { id: 1, label: "Overview", icon: HomeIcon },
  { id: 2, label: "Transactions", icon: TransactionsIcon },
  { id: 3, label: "Budgets", icon: BudgetsIcon },
  { id: 4, label: "Pots", icon: PotsIcon },
  { id: 5, label: "Recurring Bills", icon: RecurringBillsIcon },
];

/**
 * SideBarMenuList
 * -------------------------------
 * Questo componente rappresenta l'elenco dei menu della sidebar.
 * Si adatta alla modalità minimizzata o espansa della sidebar.
 *
 * Funzionalità:
 * - Mappa un array di menu (`menuItems`) per generare dinamicamente le voci del menu.
 * - Supporta uno stato attivo (`activeMenu`) per evidenziare l'elemento selezionato.
 * - Adatta il layout e il comportamento alla modalità minimizzata della sidebar.
 *
 * Props:
 * - activeMenu (number, obbligatoria): Identificativo del menu attualmente attivo.
 * - setActiveMenu (function, obbligatoria): Funzione per aggiornare il menu attivo.
 * - isSidebarMinimized (bool, obbligatoria): Indica se la sidebar è minimizzata.
 *
 * Uso:
 * - Importare e utilizzare in una struttura di sidebar.
 *
 * Esempio:
 * <SideBarMenuList
 *   activeMenu={1}
 *   setActiveMenu={(id) => console.log("Menu attivo:", id)}
 *   isSidebarMinimized={false}
 * />
 */
const SideBarMenuList = ({ activeMenu, setActiveMenu, isSidebarMinimized }) => {
  return (
    <Box
      className="sidebar-menu-list"
      sx={{
        margin: {
          xs: `${pxToRem(0)} ${pxToRem(0)} ${pxToRem(0)} ${pxToRem(0)}`,
          sm: `${pxToRem(0)} ${pxToRem(0)}`,
          md: `${pxToRem(24)} ${pxToRem(0)} `,
        },
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        justifyContent: { xs: "space-between", md: "flex-start" },
        gap: { xs: pxToRem(0), md: pxToRem(4) },
        whiteSpace: "nowrap",
        height: "100%",
      }}>
      {/* Genera dinamicamente le voci del menu */}
      {menuItems.map((menu) => {
        const Icon = menu.icon;
        const isActive = activeMenu === menu.id; // Determina se il menu è attivo

        return (
          <SideBarMenu
            key={menu.id}
            label={menu.label}
            icon={
              <Icon
                className={`sidebar-menu-icon ${isActive ? "active" : ""}`}
              />
            }
            active={isActive}
            onClick={() => setActiveMenu(menu.id)}
            isSidebarMinimized={isSidebarMinimized}
          />
        );
      })}
    </Box>
  );
};

export default SideBarMenuList;
