require("dotenv").config();

const appMiddleware = (req, res, next) => {
  const apiKey = req.header("x-api-key");
  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(401).json({ message: "Invalid API key" });
    return;
  }
  next();
};

module.exports = appMiddleware;
