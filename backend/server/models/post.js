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
      return err;
    }
  },
}
