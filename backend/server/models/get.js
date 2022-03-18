const db = require("../../database");

/* define model queries for get requests here */

module.exports = {
  getAll: async (model, query_params) => {
    try {
      //http://vitaly-t.github.io/pg-promise/Database.html#manyOrNone
      //if there are query parameters (eg. http://localhost:3000/snome?=featured)
      if (Object.keys(query_params).length !== 0) {
        let filter = Object.keys(query_params)[0];
        let value = query_params[filter];
        var result = await db.manyOrNone(
          `SELECT * FROM ${model} WHERE ${filter} = ${value};`
        );
      } else {
        var result = await db.manyOrNone(`SELECT * FROM ${model};`);
      }
      return result;
    } catch (err) {
      console.log(`DATABASE ERROR: ${err}`);
      return err;
    }
  },

  getOne: (id, model) => {
    let result = db.one(`SELECT * FROM ${model} WHERE id=${id}`);
    return result;
  },

  getUser: async (id) => {
    try {
      let result = await db.one(`SELECT * FROM snome_user WHERE id =${id}`);
      return result;
    } catch (err) {
      console.log(`DATABASE ERROR:  ${err}`);
      return err;
    }
  },

  getAllUsers: async () => {
    try {
      let result = await db.manyOrNone("SELECT * FROM snome_user");
      return result;
    } catch (err) {
      console.log(`DATABASE ERROR: ${err}`);
      return err;
    }
  },

  checkLikes: async (snome_id, snome_user_id) => {
    try {
      let likeExists = await db.one(`SELECT CASE WHEN EXISTS
      (SELECT id FROM snome_like WHERE snome_id = $1 AND snome_user_id = $2)
      THEN TRUE
      ELSE FALSE
      END
      `, [snome_id, snome_user_id]);
      return likeExists;
    } catch (err) {
      console.log(`DATABASE ERROR:  ${err}`);
      return err;
    }
  },


  // for navbar - to alert user when their property has been liked //
  getUnreadLikes: async (user_id) => {
    try {
      let result = await db.manyOrNone(`
      SELECT * FROM snome_photo FULL JOIN snome_like ON snome_photo.snome_id = snome_like.snome_id FULL JOIN snome ON snome_like.snome_id = snome.id WHERE snome_like.snome_user_id = ${user_id}
    `);
      return result
    } catch (err) {
      console.log(`DATABASE ERROR - POST: ${err}`);
      return err;
    }
  },

  getSnomeReviews: async (snome_id) => {
    try {
      let result = await db.manyOrNone(`
        SELECT snome_user.id, name, user_photo, location_id, review.* FROM snome_user
        JOIN review ON snome_user.id=review.snome_user_id
        WHERE review.snome_id=${snome_id}`);
      return result;
    } catch (err) {
      console.log(`DATABASE ERROR - GET: ${err}`);
      return err;
    }
  },

  getSnomeByLocationId: async (location_id) => {
    try {
      let result = await db.manyOrNone(
        `SELECT * FROM snome WHERE location_id = ${location_id}`
      );
      return result;
    } catch (err) {
      console.log(`DATABASE ERROR - GET: ${err}`);
      return err;
    }
  },

  getFeaturedLocation: async () => {
    try {
      let result =
        await db.manyOrNone(`select url, location_id, name, longitude, latitude
      from location_media inner join location on location_media.location_id = location.id where featured = true order by location_id`);
      return result;
    } catch (err) {
      console.log(`DATABASE ERROR - GET: ${err}`);
      return err;
    }
  },

  getSnomePhotos: async (snome_id) => {
    try {
      let result = await db.one(
        `SELECT url FROM snome_photo WHERE snome_id = ${snome_id}`
      );
      return result;
    } catch (err) {
      console.log(`DATABASE ERROR - GET: ${err}`);
      return err;
    }
  },

  getListing: async (location_id) => {
    try {
      let result =
        await db.manyOrNone(`SELECT snome_id, header, description, url, owner_id  FROM snome FULL JOIN snome_photo ON snome.id = snome_photo.snome_id
      WHERE location_id = ${location_id} ORDER BY snome_id`);
      return result;
    } catch (err) {
      console.log(`DATABASE ERROR - GET: ${err}`);
      return err;
    }
  },

  getMessages: async (user_id) => {
    try {
      let result = await db.manyOrNone(`
      SELECT * FROM message
      WHERE recipient_id = ${user_id}
      OR sender_id = ${user_id}
      ORDER BY id DESC`);
      return result;
    } catch (err) {
      console.log(`DATABASE ERROR - GET: ${err}`);
      return err;
    }
  },

  getSnomeDescription: async (snome_id) => {
    try {
      let result = await db.one(
        `SELECT * FROM snome FULL JOIN snome_photo ON snome.id = snome_photo.snome_id WHERE snome.id = ${snome_id};`
      );
      return result;
    } catch (error) {
      console.log(`DATABASE ERROR - GET: ${err}`);
      return err;
    }
  },

  getMatches: async (user_id) => {
    try {
      let result = await db.manyOrNone(`SELECT * FROM match FULL JOIN snome ON match.snome_id = snome.id FULL JOIN snome_photo ON snome.id = snome_photo.snome_id WHERE user_id = ${user_id}`);
      return result;
    } catch (err) {
      console.log(`DATABASE ERROR: ${err}`);
      return err;
    }
  },
};
