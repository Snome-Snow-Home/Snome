// script to launch server 
// supertest requires function to create server instance

const createServer = require('./index.js');
const config = require('../config.js');

const port = config.server.port;
const host = config.server.host;

const app = createServer();

app.listen(port, () => {
    console.log(`Example app listening at http://${host}:${port}`)
});