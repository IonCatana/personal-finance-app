import React, { createContext, useState, useContext } from "react";

// Creazione del contesto
const MenuContext = createContext();

/**
 * MenuProvider
 * -------------------------------
 * Questo componente fornisce un contesto globale per la gestione dello stato del menu attivo.
 * Ogni componente discendente può accedere a `activeMenu` (menu attualmente attivo) e
 * alla funzione `setActiveMenu` per aggiornarlo.
 *
 * Funzionalità:
 * - Gestisce lo stato globale del menu attivo.
 * - Fornisce un valore condiviso (`activeMenu` e `setActiveMenu`) attraverso React Context API.
 *
 * Props:
 * - children (node, obbligatorio): Elementi figli che avranno accesso al contesto.
 *
 * Uso:
 * - Avvolgere l'app o una parte specifica del componente con `MenuProvider`.
 *
 * Esempio:
 * <MenuProvider>
 *   <SideBarMenuList />
 *   <MainContent />
 * </MenuProvider>
 */
export const MenuProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(1); // Stato globale per il menu attivo

  return (
    <MenuContext.Provider value={{ activeMenu, setActiveMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

/**
 * useMenu
 * -------------------------------
 * Hook personalizzato per accedere al contesto `MenuContext`.
 *
 * Funzionalità:
 * - Consente ai componenti di accedere a `activeMenu` e `setActiveMenu`.
 * - Genera un errore se l'hook è utilizzato al di fuori di un `MenuProvider`.
 *
 * Uso:
 * - Importare e utilizzare in qualsiasi componente figlio di `MenuProvider`.
 *
 * Esempio:
 * const { activeMenu, setActiveMenu } = useMenu();
 *
 * if (activeMenu === 1) {
 *   console.log("Overview menu selezionato");
 * }
 */
export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
