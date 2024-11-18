import React, { createContext, useState, useContext } from "react";

const MenuContext = createContext();

// Fornitore del contesto
export const MenuProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(1); // Stato globale per il menu attivo

  return (
    <MenuContext.Provider value={{ activeMenu, setActiveMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

// Hook personalizzato per accedere al contesto
export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
