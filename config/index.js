require('dotenv').config();

const Required_Env_Variables = ['PORT', 'DB_URI', 'APP_ENV'];

for (const key of Required_Env_Variables) {
  if (!process.env[key]) {
    throw new Error(`Missing required env: ${key}`)
  }
}

const env = process.env.APP_ENV

const config = {
  dev: require('./dev'),
  prod: require('./prod')
}

if (!config[env]) {
  throw new Error(`Unknown Env: ${env}`)
}

module.exports = config[env];