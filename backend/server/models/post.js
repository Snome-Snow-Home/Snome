const db = require('../../database');

/* define model queries for post requests here */

module.exports = {
  createSnome: async ({ owner_id, location_id, header, time_to_mountain, mountain_access, availability_start, availability_end, address, bedrooms, bathrooms, number_of_beds, perks, description }) => {
    try {
      const id = await db.one(`
      INSERT INTO snome (
        owner_id,
        location_id,
        header,
        time_to_mountain,
        mountain_access,
        availability_start,
        availability_end,
        address,
        bedrooms,
        bathrooms,
        number_of_beds,
        perks,
        description
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
      )
      RETURNING id
      `, [owner_id, location_id, header, time_to_mountain, mountain_access, availability_start, availability_end, address, bedrooms, bathrooms, number_of_beds, perks, description]);
      return id;
    } catch (err) {
      console.log(`DATABASE ERROR - POST: ${err}`);
      return err;
    }
  },

  createSnomePhoto: async (snome_id, photosUrl) => {
    try {
      await db.none(`INSERT INTO snome_photo (snome_id, url) values ($1, $2)`, [snome_id, photosUrl])
    } catch (err) {
      console.log(`DATABASE ERROR - POST: ${err}`);
      return err;
    }
  },

  // createUser: async ({ location_id, name, travel_start, travel_end, age, user_phone, user_photo, video_tour, about, email, mailing_address, residential_address }) => {
  //   try {
  //     await db.none(`
  //       INSERT INTO snome_user (
  //         id,
  //         location_id,
  //         name,
  //         travel_start,
  //         travel_end,
  //         age,
  //         user_phone,
  //         user_photo,
  //         video_tour,
  //         about,
  //         email,
  //         mailing_address,
  //         residential_address
  //       )
  //       VALUES ((SELECT MAX(id) FROM snome_user) +1,
  //         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
  //       )
  //     `, [location_id, name, travel_start, travel_end, age, user_phone, user_photo, video_tour, about, email, mailing_address, residential_address]);
  //     return 'New user created!'
  //   } catch(err) {
  //     console.log(`DATABASE ERROR - POST: ${err}`);
  //     return err;
  //   }
  // },

  createLike: async ({ snome_user_id, snome_id }) => {
    try {
      await db.none(`
        INSERT INTO snome_like (
          snome_user_id,
          snome_id
        )
        VALUES (
          $1, $2
        )
      `, [snome_user_id, snome_id]);
    } catch (err) {
      console.log(`DATABASE ERROR - POST: ${err}`);
      return err;
    }
  },

  createMessage: async ({ sender_id, recipient_id, message_text }) => {

    let current_time = new Date().toISOString();
    try {
      const result = await db.one(`
        INSERT INTO message (
          recipient_id,
          sender_id,
          time,
          message_text,
          has_been_read
        )
        VALUES (
          $1, $2, $3, $4, $5
        )
        RETURNING *
      `, [recipient_id, sender_id, current_time, message_text, 'FALSE']);
      //returning current time since it's only param generated here
      return result
      // return current_time
    } catch (err) {
      console.log(`DATABASE ERROR - POST: ${err}`);
      return err;
    }
  },

  createReview: async ({ snome_user_id, snome_id, date, stars, review }) => {
    try {
      await db.none(`
        INSERT INTO review (
          snome_user_id,
          snome_id,
          date,
          stars,
          review
        )
        VALUES (
          $1, $2, $3, $4, $5
        )
      `, [snome_user_id, snome_id, date, stars, review]);
      return 'New review created!'
    } catch (err) {
      console.log(`DATABASE ERROR - POST: ${err}`);
      return err;
    }
  },

}
