const locales = require("../locales");

const langMiddleware = (req, res, next) => {
  const lang = req.header("lang") || "en";
  locales.setLocale(req, lang);
  res.cookie("lang", lang);
  next();
};

module.exports = langMiddleware;
