const db = require('../../database');
const { getListing } = require('./helpers');

module.exports = {
  requests: async ({limit, category, post_id}) => {
    try {
      let result = await getListing([0, post_id, category, limit]);
      return result;
    } catch(err) {
      console.log(err);
      return err;
    }
  },
  offers: async ({ post_id, category, limit }) => {
    try {
      let result = await getListing([1, post_id, category, limit]);
      return result;
    } catch(err) {
      console.log(err);
      return err;
    }
  },
  profile: async ({ email }) => {
    try {
      let results = await db.query(`SELECT * FROM profile WHERE email=$1`, [email]);
      return results;
    } catch(err) {
      console.log(err);
      return err;
    }
  },
  comments: async({ post_id, thread_id }) => {
    try {
      let data = await db.query(`
      SELECT json_agg(threads) FROM (
        SELECT
          username,
          body,
          post_id,
          thread_id,
          date AS timestamp
        FROM comments
        WHERE post_id=$1
        ORDER BY timestamp)
      AS threads
      GROUP BY thread_id`, [post_id, thread_id]);
      let results = [];
      for (var i = 0; i < data.length; i++) {
        results.push(data[i].json_agg);
      }
      return results;
    } catch(err) {
      console.log(err);
      return err;
    }
  },
  check: async({ email }) => {
    try {
      let [{ count }] = await db.query(`SELECT COUNT(id) FROM profile WHERE email=$1`, [email]);
      return count;
    } catch(err) {
      console.log(err);
      return err;
    }
  }
  // <TEMPLATE>: async (req, res) => {
  //   try {
  //     let data = await get.<TEMPLATE>(req.query);
  //     res.status(200).json(data);
  //   } catch(err) {
  //     console.log(err);
  //     res.status(400).send(err);
  //   }
  // },
}
