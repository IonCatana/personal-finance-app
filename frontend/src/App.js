import React, { useEffect } from "react";
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
  useEffect(() => {
    const rootElement = document.documentElement;
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    let lastWindowScrollY = 0;
    let lastContainerScrollTop = 0;
    let activeScrollContainer = null;

    const defaultViewportContent =
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover";
    const iosViewportContent =
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover";
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(window.navigator.userAgent) ||
      (window.navigator.platform === "MacIntel" &&
        window.navigator.maxTouchPoints > 1);
    const isFocusableField = (element) =>
      element instanceof HTMLElement &&
      ["INPUT", "TEXTAREA", "SELECT"].includes(element.tagName) &&
      !element.hasAttribute("readonly") &&
      !element.hasAttribute("disabled");
    const getScrollContainer = (element) =>
      element?.closest?.(".main-content, .signin") ||
      document.querySelector(".main-content, .signin");

    const setAppHeight = () => {
      const viewportHeight =
        window.visualViewport?.height || window.innerHeight;
      rootElement.style.setProperty("--app-height", `${viewportHeight}px`);
    };

    const restoreViewportHeight = () => {
      window.setTimeout(setAppHeight, 50);
      window.setTimeout(setAppHeight, 250);
    };

    const handleFocusIn = (event) => {
      if (!isFocusableField(event.target)) {
        return;
      }

      lastWindowScrollY = window.scrollY;
      activeScrollContainer = getScrollContainer(event.target);
      lastContainerScrollTop = activeScrollContainer?.scrollTop || 0;

      window.setTimeout(setAppHeight, 150);
      window.setTimeout(setAppHeight, 300);
    };

    const handleFocusOut = (event) => {
      if (!isFocusableField(event.target)) {
        return;
      }

      restoreViewportHeight();

      window.setTimeout(() => {
        if (activeScrollContainer) {
          activeScrollContainer.scrollTop = lastContainerScrollTop;
        }

        window.scrollTo(0, lastWindowScrollY);
      }, 120);

      window.setTimeout(() => {
        if (activeScrollContainer) {
          activeScrollContainer.scrollTop = lastContainerScrollTop;
        }

        window.scrollTo(0, lastWindowScrollY);
      }, 320);
    };

    if (viewportMeta) {
      viewportMeta.setAttribute(
        "content",
        isIOSDevice ? iosViewportContent : defaultViewportContent
      );
    }

    setAppHeight();

    window.addEventListener("resize", setAppHeight);
    window.addEventListener("orientationchange", setAppHeight);
    window.visualViewport?.addEventListener("resize", setAppHeight);
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    return () => {
      window.removeEventListener("resize", setAppHeight);
      window.removeEventListener("orientationchange", setAppHeight);
      window.visualViewport?.removeEventListener("resize", setAppHeight);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);

      if (viewportMeta) {
        viewportMeta.setAttribute("content", defaultViewportContent);
      }
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <TokenProvider>
        <MenuProvider>
          <BrowserRouter
            basename="/personal-finance-app"
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AppRoutes />
          </BrowserRouter>
        </MenuProvider>
      </TokenProvider>
    </ThemeProvider>
  );
}

export default App;
