const db = require('../../database');

/* define model queries for post requests here */

module.exports = {
  createSnome: ({ owner_id, location_id, header, time_to_mountain, mountain_access, availability_start, availability_end, street_address, bedrooms, bathrooms, number_of_beds, perks, snome_description }) => {
    let result = db.none(`
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
    return result;
  },

  createUser: ({ location_id, name, travel_start, travel_end, age, user_phone, user_photo, video_tour, about, email, mailing_address, residential_address }) => {
      let result = db.none(`
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
      return result;
  },

  createLike: ({snome_user_id, snome_id, has_been_read }) => {
    let result = db.none(`
      INSERT INTO snome_like (
        snome_user_id,
        snome_id,
        has_been_read
      )
      VALUES (
        $1, $2, $3
      )
    `, [snome_user_id, snome_id, has_been_read]);
    return result;
  },

  createMatch: ({ user_id, snome_id, has_been_read }) => {
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
  }

}
