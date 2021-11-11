const db = require('../../database');

/* define model queries for put requests here */

module.exports = {
  updateSnome: async (id, { owner_id, location_id, header, time_to_mountain, mountain_access, availability_start, availability_end, address, bedrooms, number_of_beds, perks, description }) => {
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
        address=$8,
        bedrooms=$9,
        number_of_beds=$10,
        perks=$11,
        description=$12
      WHERE id=${id}`, [body.address])
    } catch(err) {
      console.log(`DATABASE ERROR - PUT: ${err}`)
      return err;
    }
  }
}

