import axios from "axios";

/**
 * **Modulo API Client**
 *
 * Questo modulo fornisce un'istanza preconfigurata di Axios per gestire le richieste HTTP verso il backend.
 *
 * - **baseURL**: Configura l'URL di base per tutte le richieste. In questo caso, punta a `http://localhost:5000/api`.
 * - **Interceptors**: Aggiunge un'intercettazione per includere automaticamente il token di autenticazione (Bearer Token)
 *   in tutte le richieste. Il token viene recuperato dal `localStorage` e inserito nell'header `Authorization`.
 * - **Gestione degli errori**: L'intercettore gestisce eventuali errori che possono verificarsi nella configurazione della richiesta.
 *
 * Questo approccio semplifica il lavoro futuro, permettendo di inviare richieste senza dover specificare
 * manualmente il token o configurare ripetutamente l'URL di base.
 */

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Base URL comune per tutte le richieste
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
