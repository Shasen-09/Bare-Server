const logger = require('../logger')

const requestLogger = (req, res, next) => {
  const start = process.hrtime.bigint();
  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1_00_000;


    logger.info({
      event: "http_request",
      method: req.method,
      path: req.originalUrl,
      status: res.status,
      durationMS: Number(durationMs.toFixed(2)),
      ip: req.ip,
    });
  });

  next();
}

module.exports = requestLogger;