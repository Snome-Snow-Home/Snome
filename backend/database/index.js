const pgp = require('pg-promise')();
const config = require('../config.js');

const cn = {
  host: config.host,
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: config.password
};

const db = pgp(cn);

module.exports = db;
