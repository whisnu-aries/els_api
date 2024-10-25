const i18n = require("i18n");

// Konfigurasi i18n
const locales = i18n;

locales.configure({
  locales: ["en", "id"], // Daftar bahasa yang didukung
  defaultLocale: "en", // Bahasa default
  cookie: "lang", // Nama cookie untuk menyimpan pilihan bahasa
  directory: __dirname + "/locales", // Direktori untuk file terjemahan
  autoReload: true,
  syncFiles: true,
});

module.exports = locales;
