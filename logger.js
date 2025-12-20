const config = require('./config'); // dev or prod config
const levels = ['debug', 'info', 'warn', 'error', 'fatal'];

const logger = (level, payload) => {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    ...payload
  };

  const currentLevelIndex = levels.indexOf(config.logLevel);
  const messageLevelIndex = levels.indexOf(level);

  if (messageLevelIndex >= currentLevelIndex) {
    if (level === "error" || level === "fatal") {
      console.error(JSON.stringify(entry));
    } else {
      console.log(JSON.stringify(entry));
    }
  }
};

module.exports = {
  debug: (payload) => logger('debug', payload),
  info: (payload) => logger("info", payload),
  warn: (payload) => logger("warn", payload),
  error: (payload) => logger("error", payload),
  fatal: (payload) => logger("fatal", payload),
}