const db = require('../../database');

module.exports = {
  getAddress: async ({id}) => {
    try {
      const address = await db.one(`
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
};
