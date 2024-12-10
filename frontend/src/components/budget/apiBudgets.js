import apiClient from "@utils/apiClient";

/**
 * Budget API Utility
 *
 * Questo modulo fornisce una serie di funzioni per interagire con l'endpoint `/budgets`
 * attraverso il client API (`apiClient`). Le funzioni gestiscono CRUD (Create, Read, Update, Delete)
 * per i budget e sono progettate per essere utilizzate nel contesto di un'applicazione React o Node.js.
 *
 * Funzioni Esportate:
 *
 * 1. **getBudgets()**
 *    - Recupera tutti i budget dall'API.
 *    - Metodo HTTP: `GET`.
 *    - Endpoint: `/budgets`.
 *    - Ritorna: I dati dei budget ricevuti dalla risposta API.
 *    - Error Handling: Solleva un errore in caso di problemi con la richiesta.
 *
 *    Esempio:
 *    ```javascript
 *    try {
 *      const budgets = await getBudgets();
 *      console.log(budgets);
 *    } catch (error) {
 *      console.error("Errore:", error);
 *    }
 *    ```
 *
 * 2. **createBudget(budget)**
 *    - Crea un nuovo budget inviando i dati forniti all'API.
 *    - Metodo HTTP: `POST`.
 *    - Endpoint: `/budgets`.
 *    - Parametri:
 *      - `budget` (Object): Oggetto contenente i dati del budget da creare.
 *    - Ritorna: I dati del budget creato dalla risposta API.
 *    - Error Handling: Solleva un errore in caso di problemi con la richiesta.
 *
 *    Esempio:
 *    ```javascript
 *    const newBudget = { name: "Casa", amount: 1000 };
 *    try {
 *      const createdBudget = await createBudget(newBudget);
 *      console.log(createdBudget);
 *    } catch (error) {
 *      console.error("Errore:", error);
 *    }
 *    ```
 *
 * 3. **updateBudget(id, budget)**
 *    - Aggiorna un budget esistente identificato dal suo ID.
 *    - Metodo HTTP: `PUT`.
 *    - Endpoint: `/budgets/:id`.
 *    - Parametri:
 *      - `id` (String): L'ID del budget da aggiornare.
 *      - `budget` (Object): Oggetto contenente i dati aggiornati del budget.
 *    - Ritorna: I dati aggiornati del budget dalla risposta API.
 *    - Error Handling: Solleva un errore in caso di problemi con la richiesta.
 *
 *    Esempio:
 *    ```javascript
 *    const updatedData = { name: "Auto", amount: 500 };
 *    try {
 *      const updatedBudget = await updateBudget("12345", updatedData);
 *      console.log(updatedBudget);
 *    } catch (error) {
 *      console.error("Errore:", error);
 *    }
 *    ```
 *
 * 4. **deleteBudget(id)**
 *    - Elimina un budget esistente identificato dal suo ID.
 *    - Metodo HTTP: `DELETE`.
 *    - Endpoint: `/budgets/:id`.
 *    - Parametri:
 *      - `id` (String): L'ID del budget da eliminare.
 *    - Ritorna: Dati confermativi della cancellazione dalla risposta API.
 *    - Error Handling: Solleva un errore in caso di problemi con la richiesta.
 *
 *    Esempio:
 *    ```javascript
 *    try {
 *      const response = await deleteBudget("12345");
 *      console.log("Budget eliminato:", response);
 *    } catch (error) {
 *      console.error("Errore:", error);
 *    }
 *    ```
 *
 * Gestione degli Errori:
 * - Ogni funzione intercetta gli errori durante le chiamate API e li registra nel console log.
 * - Gli errori vengono rilanciati per consentire la gestione a livello superiore.
 *
 * Dipendenze:
 * - `apiClient`: Modulo per gestire le richieste HTTP configurato con un'istanza di axios.
 */

// Recuperare tutti i budget
export const getBudgets = async () => {
  try {
    const response = await apiClient.get("/budgets");
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero dei budget:", error);
    throw error;
  }
};

// Creare un nuovo budget
export const createBudget = async (budget) => {
  try {
    const response = await apiClient.post("/budgets", budget);
    return response.data;
  } catch (error) {
    console.error("Errore nella creazione del budget:", error);
    throw error;
  }
};

// Aggiornare un budget
export const updateBudget = async (id, budget) => {
  try {
    const response = await apiClient.put(`/budgets/${id}`, budget);
    return response.data;
  } catch (error) {
    console.error("Errore nell'aggiornamento del budget:", error);
    throw error;
  }
};

// Eliminare un budget
export const deleteBudget = async (id) => {
  try {
    const response = await apiClient.delete(`/budgets/${id}`);
    return response.data;
  } catch (error) {
    console.error("Errore nell'eliminazione del budget:", error);
    throw error;
  }
};
