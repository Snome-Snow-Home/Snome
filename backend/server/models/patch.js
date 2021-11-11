const db = require('../../database');

/* define model queries for patch requests here */

module.exports = {
  /* what columns are we trying to update witih this patch request */
  updateSnome: async (id, body) => {
    let result = await db.none(`UPDATE snome SET street_address = $1 WHERE id=${id}`, [body.address])
  }
}