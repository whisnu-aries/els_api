const { validationResult } = require("express-validator");

const sendResponse = (res, statusCode, success, message = "", data = null) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const translatedErrors = errors.array().map((err) => ({
      field: err.path,
      message: req.__(err.msg),
    }));
    return sendErrorResponse(res, 422, translatedErrors);
  }
};

module.exports = {
  sendResponse,
  sendErrorResponse,
  handleValidationErrors,
};
