const langMiddleware = require("./lang_middleware");
const appMiddleware = require("./app_middleware");
const adminMiddleware = require("./admin_middleware");

// Ekspor semua middleware
module.exports = {
  langMiddleware,
  appMiddleware,
  adminMiddleware,
};
