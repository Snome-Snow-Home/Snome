const db = require('../../database');

/* define model queries for get requests here */

module.exports = {
  getModelFromUrl: req => {
    const url = req.url;
    const model = url.split('/')[1].split('?')[0];
    return model;
  },

  getAll: async (model, query_params) => {
    try {
      http://vitaly-t.github.io/pg-promise/Database.html#manyOrNone
      //if there are query parameters (eg. http://localhost:3000/snome?=featured)
      if(Object.keys(query_params).length !== 0){
        let filter = Object.keys(query_params)[0]
        let value = query_params[filter]
        var result = await db.manyOrNone(`SELECT * FROM "${model}" WHERE ${filter} = ${value};`);
      }
      else{
        var result = await db.manyOrNone(`SELECT * FROM "${model}";`);
      }
      return result;
    } catch(err) {
      console.log(`DATABASE ERROR: ${err}`);
      return err;
    }
  },

  getOne: async (id, model) => {
    try {
<<<<<<< HEAD
      let result = await db.query(`SELECT * FROM ${model} WHERE id=${id}`);
=======
      let result = await db.one(`SELECT * FROM ${model} WHERE id=${id}`);
>>>>>>> 3f30fdacd61b598323f6211736701e21b3382fe6
      return result;
    } catch(err) {
      console.log(`DATABASE ERROR: ${err}`);
      return err;
    }
  },
<<<<<<< HEAD
=======

  getUser: async (id) => {
    try {
      let result = await db.one(`SELECT * FROM snome_user WHERE id =${id}`);
      return result;
    } catch(err) {
      console.log(`DATABASE ERROR:  ${err}`);
      return err;
    }
  },
>>>>>>> 3f30fdacd61b598323f6211736701e21b3382fe6

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
      AND has_been_read = false;
      `);
      return result
    } catch(err) {
      console.log(`DATABASE ERROR - POST: ${err}`);
      return err;
    }
  },

};