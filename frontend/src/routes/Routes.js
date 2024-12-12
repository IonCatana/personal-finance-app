import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@pages/Dashboard";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";
import { useToken } from "@context/TokenContext";

/**
 * **Modulo AppRoutes**
 *
 * Questo modulo definisce e gestisce il routing principale dell'applicazione utilizzando React Router.
 *
 * ### Struttura delle route
 * - **Dashboard** (`"/"`):
 *   - Accessibile solo se l'utente è autenticato (token presente).
 *   - Se il token non è disponibile, l'utente viene reindirizzato alla pagina di accesso (`/signin`).
 *
 * - **SignIn** (`"/signin"`):
 *   - Pagina di accesso.
 *   - Se l'utente è già autenticato (token presente), viene reindirizzato alla dashboard (`/`).
 *
 * - **SignUp** (`"/signup"`):
 *   - Pagina di registrazione.
 *   - Comportamento analogo alla pagina di accesso: reindirizza alla dashboard se il token è già presente.
 *
 * - **Fallback** (`"*"`, route wildcard):
 *   - Reindirizza qualsiasi percorso non corrispondente alla dashboard (`/`).
 *
 * ### Uso del contesto
 * - Utilizza il `TokenContext` tramite l'hook `useToken` per accedere allo stato di autenticazione dell'utente.
 * - Il token determina l'accesso a percorsi protetti (es. dashboard).
 *
 * ### Vantaggi
 * - Garantisce un flusso logico di navigazione per utenti autenticati e non autenticati.
 * - Semplifica la gestione dei reindirizzamenti con il componente `Navigate` di React Router.
 */

const AppRoutes = () => {
  const { token } = useToken();

  return (
    <Routes>
      {/* Route for the dashboard */}
      <Route
        path="/"
        element={token ? <Dashboard /> : <Navigate to="/signin" replace />}
      />

      {/* Route for the sign-in page */}
      <Route
        path="/signin"
        element={token ? <Navigate to="/" replace /> : <SignIn />}
      />

      {/* Route for the sign-up page */}
      <Route
        path="/signup"
        element={token ? <Navigate to="/" replace /> : <SignUp />}
      />

      {/* Fallback route */}
      <Route
        path="*"
        element={<Navigate to={token ? "/" : "/signin"} replace />}
      />
    </Routes>
  );
};

export default AppRoutes;
