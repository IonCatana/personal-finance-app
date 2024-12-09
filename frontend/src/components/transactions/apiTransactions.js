import apiClient from "@utils/apiClient";

/**
 * **API Transactions**
 *
 * Questo modulo contiene funzioni per gestire le chiamate API relative alle transazioni.
 * Utilizza l'istanza `apiClient` preconfigurata per includere automaticamente il token di autenticazione e configurazioni comuni.
 *
 * Funzioni:
 *
 * 1. **fetchTransactions**
 *    - Recupera un elenco di transazioni con supporto per la paginazione e il filtraggio.
 *    - Parametri:
 *      - `page` (number, opzionale): Pagina corrente (default: 0).
 *      - `rowsPerPage` (number, opzionale): Numero di righe per pagina (default: 10).
 *      - `search` (string, opzionale): Testo da cercare nelle transazioni.
 *      - `category` (string, opzionale): Categoria da filtrare (default: "All Transactions").
 *      - `sort` (string, opzionale): Ordine di ordinamento (default: "latest").
 *    - Ritorna:
 *      - Oggetto contenente le transazioni recuperate.
 *    - Esempio:
 *      ```js
 *      const transactions = await fetchTransactions(0, 10, "", "Dining Out", "latest");
 *      ```
 *
 * 2. **fetchTransactionsByCategory**
 *    - Recupera transazioni filtrate per una categoria specifica.
 *    - Parametri:
 *      - `category` (string, obbligatorio): Nome della categoria.
 *    - Ritorna:
 *      - Elenco di transazioni per la categoria specificata.
 *    - Esempio:
 *      ```js
 *      const diningTransactions = await fetchTransactionsByCategory("Dining Out");
 *      ```
 *
 * 3. **createTransaction**
 *    - Crea una nuova transazione.
 *    - Parametri:
 *      - `transactionData` (object, obbligatorio): Oggetto contenente i dati della nuova transazione.
 *    - Ritorna:
 *      - La transazione creata.
 *    - Esempio:
 *      ```js
 *      const newTransaction = await createTransaction({ name: "Lunch", amount: -15, category: "Dining Out" });
 *      ```
 *
 * 4. **updateTransaction**
 *    - Aggiorna una transazione esistente.
 *    - Parametri:
 *      - `transactionId` (string, obbligatorio): ID della transazione da aggiornare.
 *      - `updatedData` (object, obbligatorio): Dati aggiornati della transazione.
 *    - Ritorna:
 *      - La transazione aggiornata.
 *    - Esempio:
 *      ```js
 *      const updatedTransaction = await updateTransaction("transaction123", { amount: -20 });
 *      ```
 *
 * 5. **deleteTransaction**
 *    - Elimina una transazione.
 *    - Parametri:
 *      - `transactionId` (string, obbligatorio): ID della transazione da eliminare.
 *    - Ritorna:
 *      - Risultato dell'eliminazione.
 *    - Esempio:
 *      ```js
 *      await deleteTransaction("transaction123");
 *      ```
 *
 * Note:
 * - Gestione degli errori: Ogni funzione cattura gli errori e li rilancia per la gestione a livello superiore.
 * - I parametri opzionali consentono una configurazione flessibile delle chiamate API.
 * - Le funzioni possono essere estese per supportare ulteriori operazioni.
 */

// Recupera tutte le transazioni con parametri opzionali
export const fetchTransactions = async (
  page = 0,
  rowsPerPage = 10,
  search = "",
  category = "All Transactions",
  sort = "latest"
) => {
  try {
    const response = await apiClient.get("/transactions", {
      params: { page, rowsPerPage, search, category, sort },
    });
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero delle transactions:", error);
    throw error.response?.data || error.message;
  }
};

// Recupera le transazioni per una categoria specifica
export const fetchTransactionsByCategory = async (category) => {
  try {
    const response = await apiClient.get("/transactions", {
      params: { category }, // Passa la categoria come query param
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions by category:", error);
    throw error;
  }
};

// Aggiungi altre funzioni API per gestire le transazioni (ad esempio POST, PUT, DELETE)
export const createTransaction = async (transactionData) => {
  try {
    const response = await apiClient.post("/transactions", transactionData);
    return response.data;
  } catch (error) {
    console.error("Errore nella creazione della transaction:", error);
    throw error.response?.data || error.message;
  }
};

export const updateTransaction = async (transactionId, updatedData) => {
  try {
    const response = await apiClient.put(
      `/transactions/${transactionId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Errore nell'aggiornamento della transaction:", error);
    throw error.response?.data || error.message;
  }
};

export const deleteTransaction = async (transactionId) => {
  try {
    const response = await apiClient.delete(`/transactions/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error("Errore nell'eliminazione della transaction:", error);
    throw error.response?.data || error.message;
  }
};
