import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/**
 * **File principale di ingresso dell'applicazione React.**
 *
 * - **ReactDOM.createRoot**: Crea il root dell'applicazione utilizzando l'API di rendering moderna.
 *   Questa API migliora le prestazioni e supporta funzionalità come le Concurrent Features di React.
 *
 * - **root.render**:
 *   - Monta il componente principale `App` sull'elemento HTML con `id="root"`.
 *   - `App` è il contenitore principale che gestisce il tema, i contesti e il routing dell'app.
 *
 * - **reportWebVitals**:
 *   - Funzione opzionale per monitorare le prestazioni dell'applicazione.
 *   - Può essere usata per inviare dati a strumenti di analisi o monitoraggio.
 *   - Attualmente viene eseguita ma non è configurata per inviare dati.
 */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

reportWebVitals();
