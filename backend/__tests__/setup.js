const supertest = require('supertest');
const http = require('http');
const app = require('../server/index.js');

/* Helper function to setup server instance in test suites */

module.exports = (done) => {
    // start app on random port
    server = http.createServer(app);
    server.listen(done);
    request = supertest(server);
    // request (supertest) object made available in all tests to make API calls
    return [server, request]
}