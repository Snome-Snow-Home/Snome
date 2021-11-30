const db = require('../database')

module.exports = (done, server) => {
    // stop server instance and empty db connection pool
    server.close(done);
    db.$pool.end();
}
