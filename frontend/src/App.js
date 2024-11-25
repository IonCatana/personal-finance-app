import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  ThemeProvider,
  // CssBaseline
} from "@mui/material";
import { MenuProvider } from "@context/MenuContext";
import { TokenProvider } from "@context/TokenContext";
import theme from "./theme";
import AppRoutes from "./routes/Routes";

/**
 * Componente principale dell'applicazione:
 *
 * - **ThemeProvider**: Avvolge l'applicazione con il tema personalizzato definito in `theme.js`.
 *   Consente uno stile coerente per tutti i componenti Material-UI.
 *
 * - **CssBaseline** (attualmente commentato): Normalizza i margini, i padding e altri stili di base
 *   per garantire un aspetto uniforme tra i diversi browser. Può essere abilitato se necessario.
 *
 * - **TokenProvider**: Un contesto globale che gestisce i token di autenticazione o autorizzazione.
 *   Fornisce i metodi e lo stato per accedere e aggiornare i token in tutta l'applicazione.
 *
 * - **MenuProvider**: Un contesto globale che gestisce lo stato del menu (ad esempio, visibilità della sidebar
 *   o dei menu a tendina). Aiuta a condividere questo stato tra i componenti senza passare props manualmente.
 *
 * - **BrowserRouter**: Gestisce il routing dell'applicazione utilizzando `react-router-dom`.
 *   Include la configurazione sperimentale tramite la prop `future`:
 *   - `v7_startTransition`: Abilita transizioni più fluide tra le route.
 *   - `v7_relativeSplatPath`: Modifica la gestione dei percorsi relativi nelle route.
 *
 * - **AppRoutes**: Contiene la configurazione delle route dell'applicazione. Fornisce
 *   il mapping delle route principali come home, login, e altre sezioni dell'app.
 */

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <TokenProvider>
        <MenuProvider>
          <BrowserRouter
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AppRoutes />
          </BrowserRouter>
        </MenuProvider>
      </TokenProvider>
    </ThemeProvider>
  );
}

export default App;
