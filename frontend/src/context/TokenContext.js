import React, { createContext, useContext, useState, useEffect } from "react";

// Crea il contesto
const TokenContext = createContext();

// Provider del contesto
export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Aggiorna il token nel localStorage e nello stato
  const saveToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
    setToken(newToken);
  };

  // Effetto per sincronizzare il token con il localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken !== token) {
      setToken(storedToken);
    }
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, saveToken }}>
      {children}
    </TokenContext.Provider>
  );
};

// Hook per accedere al contesto
export const useToken = () => useContext(TokenContext);
