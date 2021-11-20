const db = require('../../database');

/* define model queries for get requests here */

module.exports = {
  getModelFromUrl: req => {
    const url = req.url;
    const model = url.split('/')[1].split('?')[0];
    return model;
  },

  getAll: (model, query_params) => {
    //http://vitaly-t.github.io/pg-promise/Database.html#manyOrNone
    //if there are query parameters (eg. http://localhost:3000/snome?=featured)
    if(Object.keys(query_params).length !== 0){
      let filter = Object.keys(query_params)[0]
      let value = query_params[filter]
      var result = db.manyOrNone(`SELECT * FROM "${model}" WHERE ${filter} = ${value};`);
    }
    else{
      var result = db.manyOrNone(`SELECT * FROM "${model}";`);
    }
    return result;
  },

  getOne: (id, model) => {
      let result = db.one(`SELECT * FROM ${model} WHERE id=${id}`);
      return result;
  },
  // for navbar - to alert user when their property has been liked //
  getUnreadLikes: (snome_user_id) => {
    let result = db.manyOrNone(`
    SELECT COUNT (id)
    FROM snome_like
    WHERE snome_id IN (SELECT id FROM snome WHERE owner_id = ${snome_user_id})
    AND has_been_read = false;
    `);
    return result;
  },

  getSnomeReviews: snome_id => {
    let result = db.manyOrNone(`
      SELECT snome_user.id, name, user_photo, location_id, review.* FROM snome_user
      JOIN review ON snome_user.id=review.snome_user_id
      WHERE review.snome_id=${snome_id}`
    );
    return result;
  },

};