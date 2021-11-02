const db = require('../../database');
const { photoDefault, postListing } = require('./helpers.js');

module.exports = {
  requests: async({ email, category, title, body }) => {
    try {
      let results = postListing([email, 0, category, title, body, Date.now(), photoDefault(category)]);
      return 'Post Successful';
    } catch(err) {
      console.log(err);
      return err;
    }
  },
  offers: async ({ email, category, title, body }) => {
    try {
      let result = postListing([email, 1, category, title, body, Date.now(), photoDefault(category)])
      return 'Post Successful!';
    } catch(err) {
      console.log(err);
      return err;
    }
  },
  profile: async({ firebase_id, firstname, lastname, username, email, homephone, mobile, preferredcontact, city, state, zip, address1, address2, role, organization }) => {
     try {
      let result = await db.none(
        `INSERT INTO profile(
          id,
          firebase_id,
          firstName,
          lastName,
          userName,
          email,
          mobile,
          preferredContact,
          city, state,
          zip,
          address1,
          address2,
          role,
          organization)
        VALUES (
          (SELECT MAX(id) FROM profile) + 1,
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
          )`, [firebase_id, firstname, lastname, username, email, mobile, preferredcontact, city, state, zip, address1, address2, role, organization]);
      return 'Post Successful';
    } catch(err) {
      console.log(err);
      return err;
    }
  },
  comments: async ({ post_id, thread_id, email, body }) => {
    try {
      if ( !thread_id ) {
        [{ max }] = await db.query(`SELECT MAX(thread_id) FROM comments`);
        thread_id = parseInt(max);
        thread_id += 1;
      }
      let result = await db.none(
        `INSERT INTO comments
         (id, userName, post_id, thread_id, body, date)
         VALUES
         ((SELECT MAX(id) FROM comments) + 1,
	 (SELECT username FROM profile WHERE email=$1),
         $2, $3, $4,$5
         )`, [email, post_id, parseInt(thread_id), body, parseInt(Date.now())]
      );
      return 'Much Success, Very Nice';
    } catch(err) {
      console.log(err);
      return err;
    }
  },
  // <TEMPLATE>: async (req, res) => {
  //   try {
  //     let data = await get.<TEMPLATE>(req.body);
  //     res.status(200).json(data);
  //   } catch(err) {
  //     console.log(err);
  //     res.status(400).send(err);
  //   }
  // },
}
