const app = require('./index.js');
const config = require('../config.js');

const port = parseInt(config.server.port);
const host = config.server.host;

app.listen(port, () => {
    console.log(`Example app listening at http://${host}:${port}`)
});