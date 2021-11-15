const db = require('../../database');

/* define model queries for get requests here */

module.exports = {
  getModelFromUrl: req => {
    const url = req.url;
    const model = url.split('/')[1];
    return model;
  },
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
      let result = await db.query(`SELECT * FROM ${model} WHERE id=${id}`);
      return result;
    } catch(err) {
      console.log(`DATABASE ERROR: ${err}`);
      return err;
    }
  },

  getUser: async (id) => {
    try {
      let result = await db.query(`SELECT * FROM snome_user WHERE id =${id}`)
      return result;
    } catch(err) {
      console.log(`DATABASE ERROR:  ${err}`);
      return err;
    }
  },

  // for navbar - to alert user when their property has been liked //
  getUnreadLikes: async ({snome_user_id}) => {
    try {
      let result =  await db.none(`
      SELECT COUNT (id)
      FROM snome_like
      WHERE snome_id IN (SELECT id FROM snome WHERE owner_id = 3)
      AND has_been_read = true;
      `, [snome_user_id, snome_id, has_been_read]);
      return result
    } catch(err) {
      console.log(`DATABASE ERROR - POST: ${err}`);
      return err;
    }
  },

};