/* instatiate database connection to AWS RDS postgres instance */
const pgp = require('pg-promise')();
const config = require('../config.js');

const cn = config.db;

const db = pgp(cn);

module.exports = db;