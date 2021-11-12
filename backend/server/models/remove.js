const db = require('../../database');

module.exports = {
  deleteSnome: async (id) => {
    try {
      await db.none(`DELETE FROM snome WHERE id=${id}`);
      return 'complete';
    } catch(err) {
      console.log(`DATABASE ERROR - DELETE: ${err}`);
      return err;
    }
  },
}