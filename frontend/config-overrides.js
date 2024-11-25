const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

/**
 * Configurazione di Webpack con customize-cra
 * -------------------------------------------
 * Questo file configura Webpack per aggiungere alias ai percorsi delle directory
 * principali del progetto. Gli alias semplificano e migliorano la leggibilità
 * degli import nei file JavaScript/TypeScript.
 *
 * Funzionalità:
 * - Utilizza `customize-cra` per sovrascrivere la configurazione predefinita di Create React App.
 * - Definisce alias per directory comuni, come `@components` o `@utils`.
 *
 * Alias:
 * - @components: src/components
 * - @pages: src/pages
 * - @utils: src/utils
 * - @hooks: src/hooks
 * - @routes: src/routes
 * - @assets: src/assets
 * - @context: src/context
 * - @services: src/services
 *
 * Uso:
 * - Importare file o moduli utilizzando gli alias definiti.
 *
 * Esempio:
 * Import tradizionale
 * import Button from "../../components/Button";
 *
 * Con alias:
 * import Button from "@components/Button";
 */
module.exports = override(
  addWebpackAlias({
    "@components": path.resolve(__dirname, "src/components"),
    "@pages": path.resolve(__dirname, "src/pages"),
    "@utils": path.resolve(__dirname, "src/utils"),
    "@hooks": path.resolve(__dirname, "src/hooks"),
    "@routes": path.resolve(__dirname, "src/routes"),
    "@assets": path.resolve(__dirname, "src/assets"),
    "@context": path.resolve(__dirname, "src/context"),
    "@services": path.resolve(__dirname, "src/services"),
  })
);
