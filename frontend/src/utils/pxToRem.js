/**
 * Converte i pixel (px) in rem.
 *
 * @param {number} px - Il valore in pixel da convertire.
 * @param {number} [baseFontSize=16] - La dimensione del font base (default: 16px).
 * @returns {string} - Il valore convertito in rem con l'unità 'rem' inclusa.
 *
 * -------------------------------
 * pxToRem
 * -------------------------------
 * Funzione progettata per gestire layout responsive convertendo valori pixel in rem.
 *
 * Funzionalità:
 * - Converte valori in pixel in unità rem per una maggiore scalabilità e flessibilità.
 * - Utilizza una dimensione di font base configurabile, con un valore predefinito di 16px.
 * - È comunemente utilizzata per impostare dimensioni inline in Material-UI o componenti React.
 *
 * Uso:
 * Importare la funzione e utilizzarla direttamente per definire proprietà di stile.
 *
 * Esempio:
 * import { pxToRem } from "@utils/pxToRem";
 * const styles = {
 *   width: pxToRem(24), // "1.5rem"
 *   padding: `${pxToRem(8)} ${pxToRem(16)}`, // "0.5rem 1rem"
 * };
 */
export const pxToRem = (px, baseFontSize = 16) => {
  // Validazione dei parametri
  if (typeof px !== "number" || typeof baseFontSize !== "number") {
    throw new TypeError("Both px and baseFontSize should be numbers");
  }
  if (baseFontSize <= 0) {
    throw new RangeError("baseFontSize should be a positive non-zero number");
  }

  // Conversione da pixel a rem
  return `${px / baseFontSize}rem`;
};
