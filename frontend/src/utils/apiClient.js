import axios from "axios";

/**
 * **Modulo API Client**
 *
 * Questo modulo fornisce un'istanza preconfigurata di Axios per gestire le richieste HTTP verso il backend.
 *
 * - **baseURL**: Definisce l'URL di base per tutte le richieste HTTP, in questo caso `${process.env.REACT_APP_BACKEND_URL}/api`.
 * - **Interceptors di richiesta**:
 *   - Aggiunge automaticamente un token di autenticazione (Bearer Token) preso dal `localStorage` nell'header `Authorization` di tutte le richieste.
 *   - Gestisce eventuali errori nella configurazione delle richieste.
 * - **Interceptors di risposta**:
 *   - Intercetta errori HTTP (es. `401 Unauthorized`) e gestisce la scadenza o invalidità del token.
 *   - Se il token non è valido o scaduto, viene rimosso dal `localStorage` e l'utente viene reindirizzato alla pagina di login (`/signin`).
 * - **Vantaggi**:
 *   - Centralizzazione della gestione di autenticazione e gestione errori per tutte le richieste HTTP.
 *   - Semplifica l'implementazione delle chiamate API nei componenti, senza dover configurare manualmente il token o gestire ripetutamente gli errori.
 *
 * **Uso**:
 * - Importa l'istanza `apiClient` nei tuoi moduli o componenti per eseguire chiamate API:
 *   ```javascript
 *   import apiClient from './apiClient';
 *   apiClient.get('/endpoint')
 *     .then(response => console.log(response.data))
 *     .catch(error => console.error(error));
 *   ```
 */
const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
});

// Interceptor delle richieste per aggiungere il token di autenticazione
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Errore nell'interceptor delle richieste:", error);
    return Promise.reject(error);
  }
);

// Interceptor delle risposte per gestire errori di autenticazione
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Sessione scaduta. Rimuovendo il token...");
      localStorage.removeItem("token");
      // Reindirizzare alla pagina di login
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
