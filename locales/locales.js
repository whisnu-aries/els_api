const i18n = require("i18n");

const locales = i18n;

locales.configure({
  locales: ["en", "id"],
  defaultLocale: "en",
  cookie: "lang",
  directory: __dirname,
  autoReload: false,
  syncFiles: false,
});

module.exports = locales;
