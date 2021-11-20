const db = require('../../database');

module.exports = {
  getModelFromUrl: req => {
    const url = req.url;
    const model = url.split('/')[1].split('?')[0];
    return model;
  },

  remove: (id, model) => {
    let result = db.none(`DELETE FROM ${model} WHERE id=${id}`);
    return result;
  },
}