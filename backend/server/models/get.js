const db = require('../../database');

/* define model queries for get requests here */

module.exports = {
  getAll: async (model) => {
    try {
      // http://vitaly-t.github.io/pg-promise/Database.html#manyOrNone
      let result = await db.manyOrNone(`SELECT * FROM $1`, [model])

      // let result = await db.manyOrNone(`SELECT * FROM snome`, [model])

    //   let result = await db.manyOrNone(`  SELECT table_name
    //   FROM information_schema.tables
    //  WHERE table_schema='public'
    //    AND table_type='BASE TABLE';`)
      return result;
    } catch(err) {
      console.log(`DATABASE ERROR: ${err}`)
    }
  }
};