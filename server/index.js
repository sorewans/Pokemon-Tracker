const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const middlewares = require('./middlewares');
const cards = require('./api/cards');
const owned = require('./api/owned');
const connectDB = require('./config/db');

require('dotenv').config();
const app = express();

connectDB();

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use('/cards', cards);
app.use('/owned', owned);

// Not found middleware
app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

app.listen(3010, () => {
  console.log("Server is running on Port 3010")
});

