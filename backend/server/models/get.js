const db = require('../../database');

/* define model queries for get requests here */

module.exports = {
  getAll: async (model) => {
    try {
      // http://vitaly-t.github.io/pg-promise/Database.html#manyOrNone
      let result = await db.manyOrNone(`SELECT * FROM "${model}";`);
      return result;
    } catch(err) {
      console.log(`DATABASE ERROR: ${err}`);
      return err;
    }
  },

  getOne: async (id, model) => {
    try {
      let result = await db.query(`SELECT * FROM "snome" WHERE id=${id}`);
      return result;
    } catch(err) {
      console.log(`DATABASE ERROR: ${err}`);
      return err;
    }
  },
};