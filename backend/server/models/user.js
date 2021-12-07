const db = require('../../database');

module.exports = {

  createUser: async ({ location_id, name, travel_start, travel_end, age, user_phone, user_photo, video_tour, about, email, mailing_address, residential_address }) => {
    try {
      await db.none(`
        INSERT INTO snome_user (
          id,
          location_id,
          name,
          travel_start,
          travel_end,
          age,
          user_phone,
          user_photo,
          video_tour,
          about,
          email,
          mailing_address,
          residential_address,
          password,
          isActive
        )
        VALUES ((SELECT MAX(id) FROM snome_user) +1,
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
        )
      `, [location_id, name, travel_start, travel_end, age, user_phone, user_photo, video_tour, about, email, mailing_address, residential_address]);
      return 'New user created!'
    } catch(err) {
      console.log(`DATABASE ERROR - POST: ${err}`);
      return err;
    }
  },

  updateUser: async (id, { location_id, name, travel_start, travel_end, age, user_phone, user_photo, video_tour, about, email, mailing_address, residential_address }) => {
    try {
      await db.none(`
        UPDATE snome_user
        SET
          location_id=$1,
          name=$2,
          travel_start=$3,
          travel_end=$4,
          age=$5,
          user_phone=$6,
          user_photo=$7,
          video_tour=$8,
          about=$9,
          email=$10,
          mailing_address=$11,
          residential_address=$12
        WHERE id=${id}
      `, [location_id, name, travel_start, travel_end, age, user_phone,
        user_photo, video_tour, about, email, mailing_address, residential_address]);
        return 'Update Successful';
    } catch(err) {
      console.log(`DATABASE ERROR - PUT: ${err}`);
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

  checkForEmail: async (email) => {
    try {
      let emailExists = await db.one(
        `SELECT
          CASE WHEN EXISTS
          (
            SELECT id FROM snome_user WHERE email=${email}
          )
            THEN 'TRUE'
            ELSE 'FALSE'
          END
      `);
      return emailExists;
      //
    } catch(err) {
      console.log(`DATABASE ERROR while checking if email exists:  ${err}`);
    }
  },

  deleteUser: async (id) => {
    try {
      await db.none(`
        DELETE FROM review
        WHERE EXISTS (SELECT * FROM snome
                      WHERE snome.id=review.snome_id
                      AND snome.owner_id=${id})
      `);
      await db.none(`DELETE FROM review WHERE snome_user_id=${id}`);
      await db.none(`
        DELETE FROM snome_photo
        WHERE EXISTS (SELECT * FROM snome
                      WHERE snome.id=snome_photo.snome_id
                      AND snome.owner_id=${id})
      `);
      await db.none(`
        DELETE FROM trip
        WHERE EXISTS (SELECT * FROM snome
                      WHERE snome.id=trip.snome_id
                      AND snome.owner_id=${id})
      `);
      await db.none(`DELETE FROM match WHERE snome_user_id=${id}`);
      await db.none(`
        DELETE FROM match
        WHERE EXISTS (SELECT * FROM snome
                      WHERE snome.id=match.snome_id
                      AND snome.owner_id=${id})
      `);
      await db.none(`
        DELETE FROM snome_like
        WHERE EXISTS (SELECT * FROM snome
                      WHERE snome.id=snome_like.snome_id
                      AND snome.owner_id=${id})
      `);
      await db.none(`DELETE FROM snome_like WHERE snome_user_id=${id}`);
      await db.none(`DELETE FROM snome WHERE owner_id=${id}`);
      await db.none(
        `DELETE FROM message WHERE sender_id=${id} OR recipient_id=${id}`
      );
      await db.none(`DELETE FROM snome_user WHERE id=${id}`);
      return "Delete Successful";
    } catch (err) {
      console.log(`DATABASE ERROR - DELETE: ${err}`);
      return err;
    }
  },

}