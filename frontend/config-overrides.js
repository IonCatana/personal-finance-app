const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@components": path.resolve(__dirname, "src/components"),
    "@pages": path.resolve(__dirname, "src/pages"),
    "@utils": path.resolve(__dirname, "src/utils"),
    "@hooks": path.resolve(__dirname, "src/hooks"),
    "@routes": path.resolve(__dirname, "src/routes"),
    "@assets": path.resolve(__dirname, "src/assets"),
  })
);
