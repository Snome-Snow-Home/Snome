const pgp = require('pg-promise')();
const config = require('../config.js');

/* instatiate database connection to AWS RDS postgres instance */
// http://vitaly-t.github.io/pg-promise/index.html

const cn = config.db;

// db uses a lazy connection - only intantiate once
const db = pgp(cn);

module.exports = db;