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
 * **Componente SideBarMenuList**
 *
 * Questo componente rappresenta la lista completa dei menu della sidebar. Ogni voce di menu è generata dinamicamente
 * in base all'array `menuItems`, rendendo il componente modulare e facile da aggiornare.
 *
 * ### **Struttura dei menu**
 * L'array `menuItems` contiene gli elementi del menu con le seguenti proprietà:
 * - **id**: Identificativo univoco per ciascun menu.
 * - **label**: Etichetta descrittiva del menu.
 * - **icon**: Componente React per l'icona associata alla voce di menu.
 *
 * Esempio di struttura:
 * ```javascript
 * const menuItems = [
 *   { id: 1, label: "Overview", icon: HomeIcon },
 *   { id: 2, label: "Transactions", icon: TransactionsIcon },
 *   ...
 * ];
 * ```
 *
 * ### **Props**
 * - **activeMenu (number)**:
 *   - Indica quale menu è attualmente attivo.
 *   - Determina lo stato visivo dell'elemento (colore, indicatori, ecc.).
 * - **setActiveMenu (function)**:
 *   - Funzione utilizzata per aggiornare lo stato `activeMenu`.
 *   - Viene chiamata quando l'utente clicca su un elemento del menu.
 * - **isSidebarMinimized (boolean)**:
 *   - Indica se la sidebar è minimizzata.
 *   - Determina la visibilità delle etichette accanto alle icone.
 *
 * ### **Stile e Layout**
 * - **Contenitore principale (`sidebar-menu-list`)**:
 *   - **Responsivo**:
 *     - Su schermi piccoli (`xs`): I menu sono disposti in una riga orizzontale.
 *     - Su schermi medi e grandi (`md`): I menu sono disposti in una colonna verticale.
 *   - **Scroll**:
 *     - Attiva lo scorrimento verticale con `overflowY: auto` per gestire una lista lunga.
 *     - Nasconde la barra di scorrimento visivamente per un design pulito (`scrollbarWidth: none` e `msOverflowStyle: none`).
 *   - **Spaziatura**:
 *     - Utilizza `gap` per aggiungere spazio tra le voci del menu.
 *     - I margini cambiano dinamicamente in base alla dimensione dello schermo.
 *
 * ### **Funzionalità**
 * - **Generazione dinamica dei menu**:
 *   - Le voci del menu vengono generate iterando sull'array `menuItems` con `map`.
 *   - Ogni voce utilizza il componente `SideBarMenu`.
 * - **Stato attivo**:
 *   - Il menu attivo viene determinato confrontando `activeMenu` con l'id dell'elemento corrente.
 *   - Gli elementi attivi hanno uno stile visivo diverso (es. colore o indicatori).
 * - **Interazioni**:
 *   - Cliccare su una voce chiama `setActiveMenu` per aggiornare lo stato e cambiare il contenuto visualizzato.
 *
 * ### **Componenti utilizzati**
 * - **SideBarMenu**:
 *   - Rappresenta una singola voce di menu.
 *   - Accetta label, icona, stato attivo e callback per il clic.
 *
 * ### **Comportamento responsivo**
 * - **Schermi piccoli (`xs`)**:
 *   - Disposizione orizzontale (`flexDirection: row`) con icone compatte.
 *   - Le etichette sono nascoste per risparmiare spazio.
 * - **Schermi grandi (`md` e superiori)**:
 *   - Disposizione verticale (`flexDirection: column`) con etichette visibili (se `isSidebarMinimized` è `false`).
 *
 * ### **Note tecniche**
 * - **Scroll personalizzato**:
 *   - Lo scroll verticale è attivato con `overflowY: auto` e visivamente nascosto per un design pulito.
 * - **Modularità**:
 *   - Aggiungere o rimuovere elementi del menu è semplice: basta aggiornare l'array `menuItems`.
 * - **Accessibilità**:
 *   - Gli elementi del menu sono facilmente navigabili e reattivi ai clic.
 */

const menuItems = [
  { id: 1, label: "Overview", icon: HomeIcon },
  { id: 2, label: "Transactions", icon: TransactionsIcon },
  { id: 3, label: "Budgets", icon: BudgetsIcon },
  { id: 4, label: "Pots", icon: PotsIcon },
  { id: 5, label: "Recurring Bills", icon: RecurringBillsIcon },
];

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
