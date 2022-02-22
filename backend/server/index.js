const config = require('../config.js');
const express = require('express');
const router = require('./routes/routes.js');

const port = parseInt(config.server.port);
const host = config.server.host;

const app = express();
const cors = require('cors');
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type', 'Authorization'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

// middleware to send responses as json
app.use(express.json());
app.use((req, res, next) => {
  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', `http://${host}:${port}`);
  res.setHeader('Access-Control-Allow-Origin', `*`);
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);
  next();
});
app.use('/', router);


module.exports = app;
