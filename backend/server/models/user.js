const db = require('../../database');
const bcrypt = require('bcrypt')

module.exports = {
  getAddress: async ({id}) => {
    try {
      let address = await db.one(`
        SELECT *
        FROM address
        WHERE id='${id}'
      `)
      return address
    } catch (err) {
      console.log(`DATABASE ERROR - GET: ${err}`);
      return err;
    }
  },

  createUser: async ({city, confirmPassword, email, name, password, state, street, zipCode}) => {
    try {
      const addressId = await db.one(`
        INSERT INTO address (
          id,
          street,
          city,
          state,
          zip_code
        )
        VALUES (
          (SELECT MAX(id) FROM address) +1,
          '${street}',
          '${city}',
          '${state}',
          '${zipCode}'
        )
        RETURNING id;
      `);

      const hashPass = bcrypt.hashSync(password, 10);

      const userId = await db.one(`
        INSERT INTO snome_user (
          id,
          name,
          about,
          email,
          mailing_address,
          residential_address,
          password,
          is_active
        )
        VALUES (
          (SELECT MAX(id) FROM snome_user) +1,
          '${name}',
          'placeholder',
          '${email}',
          ${addressId.id},
          ${addressId.id},
          '${hashPass}',
          false
        )
        RETURNING id;
      `);
      return `New user created: ${JSON.stringify(userId)}`
    } catch(err) {
      console.log(`DATABASE ERROR - POST: ${err}`);
      return err;
    }
  },

  comment: {
    // { street, city, state, zipCode, location_id, name, travel_start, travel_end, age, user_phone, user_photo, video_tour, about, email, mailing_address, residential_address, password, isActive }

    // INSERT INTO snome_user (
    //   id,
    //   location_id,
    //   name,
    //   travel_start,
    //   travel_end,
    //   age,
    //   user_phone,
    //   user_photo,
    //   video_tour,
    //   about,
    //   email,
    //   mailing_address,
    //   residential_address,
    //   password,
    //   isActive
    // )
    // VALUES ((SELECT MAX(id) FROM snome_user) +1,
    //   $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
    // )
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

  getUserByName: async (name) => {
    name = 'John Smith';
    //George Thomson
    try {
      let result = await db.one('SELECT * FROM snome_user WHERE name = $1', name);
      console.log('db success: ', result.password)
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
            SELECT id FROM snome_user WHERE email='${email}'
          )
            THEN 'true'
            ELSE 'false'
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