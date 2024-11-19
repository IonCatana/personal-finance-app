import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "@pages/Dashboard";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";

/**
 * AppRoutes
 * -------------------------------
 * Questo componente definisce tutte le rotte principali dell'applicazione
 * utilizzando il pacchetto `react-router-dom`.
 *
 * Funzionalità:
 * - Organizza le pagine dell'applicazione in base ai percorsi (path).
 * - Rende le pagine accessibili attraverso i percorsi specificati.
 *
 * Rotte Definite:
 * - `/`: Mostra la Dashboard principale.
 * - `/signin`: Mostra la pagina di accesso.
 * - `/signup`: Mostra la pagina di registrazione.
 *
 * Uso:
 * - Importare il componente e includerlo all'interno del provider `BrowserRouter`.
 *
 * Esempio:
 * import { BrowserRouter } from "react-router-dom";
 * import AppRoutes from "@routes/Routes";
 *
 * <BrowserRouter>
 *   <AppRoutes />
 * </BrowserRouter>
 */
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default AppRoutes;
