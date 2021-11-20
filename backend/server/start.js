// script to launch server 
// necessary because supertest requires app to be exported from index.js

const app = require('./index.js');
const config = require('../config.js');

const port = config.server.port;
const host = config.server.host;

app.listen(port, () => {
    console.log(`Example app listening at http://${host}:${port}`)
});