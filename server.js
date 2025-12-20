require('dotenv').config();

const express = require('express')
const startRoute = require('./routes/startRoute')
const userRoute = require('./routes/userRoute')
const itemRoute = require('./routes/itemRoute');
const requestLogger = require('./middlewares/loggerHandler');
const errorHandler = require('./middlewares/errorHandler');
const config = require('./config');
const connectDB = require('./models/db')


const Required_Env_Variables = ['DB_URI', 'APP_ENV'];

for (const key of Required_Env_Variables) {
  if (!process.env[key]) {
    throw new Error(`Missing required env: ${key}`)
  }
}

const PORT = Number(process.env.PORT) || 3000;
if (Number.isNaN(PORT)) {
  throw new Error('PORT must be a number')
}

const app = express();
app.use(express.json());
app.use(requestLogger)

app.use('/health', startRoute)
app.use('/user', userRoute)
app.use('/item', itemRoute)

app.use(errorHandler)

app.get("/crash", async (req, res) => {
  throw new Error("boom");
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log("Server started:")
    console.log('Environment:', process.env.APP_ENV);
    console.log('PORT:', PORT)
    console.log('loglevel:', config.logLevel)
  })
}

startServer();
