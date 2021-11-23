const db = require('../../database');

/* helper functions wrapping verbose SQL queries here */
module.exports = {
  getModelFromUrl: req => {
    const url = req.url;
    const model = url.split('/')[1].split('?')[0];
    return model;
  },
}