import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * **TokenContext**
 *
 * Questo modulo fornisce un contesto per gestire il token di autenticazione dell'utente.
 * Consente l'accesso e l'aggiornamento centralizzato del token utilizzato per autenticare le richieste.
 *
 * ### Struttura e funzionalità:
 *
 * 1. **TokenContext**:
 *    - Contesto creato con `createContext`.
 *    - Fornisce un oggetto che include lo stato del token (`token`) e una funzione per aggiornarlo (`saveToken`).
 *
 * 2. **TokenProvider**:
 *    - Componente che avvolge i componenti figli e rende disponibile il contesto tramite il `TokenContext.Provider`.
 *    - **Stato iniziale**:
 *      - Il token viene recuperato dal `localStorage` al caricamento dell'app.
 *    - **saveToken**:
 *      - Funzione per aggiornare il token sia nello stato locale che nel `localStorage`.
 *      - Rimuove il token dal `localStorage` se viene passato un valore `null` o `undefined`.
 *    - **useEffect**:
 *      - Sincronizza il token nello stato con quello presente nel `localStorage`.
 *      - Previene disallineamenti tra lo stato del token e il valore memorizzato.
 *
 * 3. **useToken**:
 *    - Custom hook che permette l'accesso semplice al contesto del token.
 *    - Evita la necessità di importare `useContext(TokenContext)` direttamente nei componenti.
 *
 * ### Vantaggi:
 * - Centralizzazione della gestione del token.
 * - Riduzione della complessità nel gestire il `localStorage` in più componenti.
 * - Garantisce la sincronizzazione tra stato e `localStorage`.
 */

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
