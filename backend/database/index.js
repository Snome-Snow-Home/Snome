const pgp = require('pg-promise')();
const config = require('../config.js');

const cn = config.db;

/* 
db represents the Database protocol with lazy connection, 
i.e. only the actual query methods acquire and release the connection automatically. 
Therefore you should create only one global/shared db object per cn details.
*/

const db = pgp(cn);

module.exports = db;