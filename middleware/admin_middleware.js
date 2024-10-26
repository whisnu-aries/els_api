const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Forbidden access." });
  }

  jwt.verify(token, process.env.JWT_TOKEN, (err, data) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden access." });
    }

    req.accountId = data.accountId;
    req.userId = data.userId;
    req.roleId = data.roleId;
    next();
  });
};

module.exports = adminMiddleware;
