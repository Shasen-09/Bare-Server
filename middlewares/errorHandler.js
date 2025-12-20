const logger = require("../logger")

const errorHandler = (err, req, res, next) => {
  logger.error({
    event: "application_error",
    message: err.message,
    method: req.method,
    path: req.originalUrl,
    status: err.status
  })
  res.status(500).json({ error: "Internal Server Error" })
}

module.exports = errorHandler;