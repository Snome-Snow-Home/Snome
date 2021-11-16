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
      let result = await db.one(`SELECT * FROM ${model} WHERE id=${id}`);
      return result;
    } catch(err) {
      console.log(`DATABASE ERROR: ${err}`);
      return err;
    }
  },

  getUser: async (id) => {
    try {
      let result = await db.one(`SELECT * FROM snome_user WHERE id =${id}`);
      return result;
    } catch(err) {
      console.log(`DATABASE ERROR:  ${err}`);
      return err;
    }
  },

  getAllUsers: async () => {
    try {
      let result = await db.manyOrNone('SELECT * FROM snome_user');
      return result;
    } catch(err) {
      console.log(`DATABASE ERROR: ${err}`);
      return err;
    }
  },

  // for navbar - to alert user when their property has been liked //
  getUnreadLikes: async (snome_user_id) => {
    try {
      let result =  await db.manyOrNone(`
      SELECT COUNT (id)
      FROM snome_like
      WHERE snome_id IN (SELECT id FROM snome WHERE owner_id = ${snome_user_id})
      AND has_been_read = true;
      `);
      return result
    } catch(err) {
      console.log(`DATABASE ERROR - POST: ${err}`);
      return err;
    }
  },

};