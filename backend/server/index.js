const config = require('../config.js');
const express = require('express');
const router = require('./routes.js');


const app = express();
const port = config.server.port || 3000;
const host = config.server.host || 'localhost';

app.use(express.json());
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', `http://${host}:${port}`);
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);
  next();
})

app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening at http://${host}:${port}`)
});