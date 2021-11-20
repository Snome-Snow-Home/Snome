const db = require('../../database');

/* define model queries for post requests here */

module.exports = {
  createSnome: async ({ owner_id, location_id, header, time_to_mountain, mountain_access, availability_start, availability_end, street_address, bedrooms, bathrooms, number_of_beds, perks, snome_description }) => {
    try {
      await db.none(`
      INSERT INTO snome (
        owner_id,
        location_id,
        header,
        time_to_mountain,
        mountain_access,
        availability_start,
        availability_end,
        street_address,
        bedrooms,
        bathrooms,
        number_of_beds,
        perks,
        snome_description
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
      )
      `, [owner_id, location_id, header, time_to_mountain, mountain_access, availability_start, availability_end, street_address, bedrooms, bathrooms, number_of_beds, perks, snome_description]);
      return "New Snome created";
    } catch(err) {
      console.log(`DATABASE ERROR - POST: ${err}`);
    }
  },

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
          residential_address
        )
        VALUES ((SELECT MAX(id) FROM snome_user) +1,
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
        )
      `, [location_id, name, travel_start, travel_end, age, user_phone, user_photo, video_tour, about, email, mailing_address, residential_address]);
      return 'New user created!'
    } catch(err) {
      console.log(`DATABASE ERROR - POST: ${err}`);
    }
  },

  createLike: async ({snome_user_id, snome_id, has_been_read }) => {
    try {
      await db.none(`
        INSERT INTO snome_like (
          snome_user_id,
          snome_id,
          has_been_read
        )
        VALUES (
          $1, $2, $3
        )
      `, [snome_user_id, snome_id, has_been_read]);
      return 'New like created!'
    } catch(err) {
      console.log(`DATABASE ERROR - POST: ${err}`);
    }
  },

  createMatch: ({ suser_id, snome_id, has_been_read }) => {
    // try {
      let data = db.none(`
        INSERT INTO match (
          id,
          user_id,
          snome_id,
          has_been_read
          )
          VALUES (
            (SELECT MAX(id)+1 FROM match), $1, $2, $3
          )
      `, [user_id, snome_id, has_been_read]);
      return data;
      // return 'Match created successfully!';
    // } catch(err) {
    //   console.log(`DATABASE POST ${err}`);
    // }
  }

}
