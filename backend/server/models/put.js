const db = require('../../database');

/* define model queries for put requests here */

module.exports = {
  updateSnome: async (id, { owner_id, location_id, header, time_to_mountain, mountain_access, availability_start, availability_end, street_address, bedrooms, bathrooms, number_of_beds, perks, snome_description }) => {
    try {
      let result = await db.none(`
      UPDATE snome
      SET
        owner_id=$1,
        location_id=$2,
        header=$3,
        time_to_mountain=$4,
        mountain_access=$5,
        availability_start=$6,
        availability_end=$7,
        street_address=$8,
        bedrooms=$9,
        bathrooms=$10,
        number_of_beds=$11,
        perks=$12,
        snome_description=$13
      WHERE id=${id}`, [owner_id, location_id, header, time_to_mountain, mountain_access,
         availability_start, availability_end, street_address, bedrooms, bathrooms, number_of_beds,
          perks, snome_description]);
      return 'Update successful';
    } catch(err) {
      console.log(`DATABASE ERROR - PUT: ${err}`)
      return err;
    }
  },

  updateUser: async (id, { location_id, name, travel_start, travel_end, age, user_phone, user_photo, video_tour, about, email, mailing_address, residential_address }) => {
    try {
      await put.none(`
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
}

