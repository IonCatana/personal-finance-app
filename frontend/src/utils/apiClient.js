import axios from "axios";

// Crea una nuova istanza di axios
const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Base URL comune per tutte le richieste
});

// Aggiungi un'intercettazione per includere il token in tutte le richieste
apiClient.interceptors.request.use(
  (config) => {
    // console.log("Request made with config:", config);
    // Recupera il token dal localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // Aggiungi l'header Authorization con il token
      config.headers.Authorization = `Bearer ${token}`;
      // console.log("Token added to headers:", token);
    }
    return config;
  },
  (error) => {
    // Gestisce errori nell'intercettazione
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
