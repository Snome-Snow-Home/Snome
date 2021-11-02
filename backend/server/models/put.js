const db = require('../../database');

module.exports = {
  profile: async({ ogemail, firebase_id, firstname, lastname, username, email, homephone, mobile, preferredcontact, city, state, zip, address1, address2, role, organization }) => {
    try {
      let result = await db.none(`
      UPDATE profile
      SET
        firebase_id=$1,
        firstName=$2,
        lastName=$3,
        userName=$4,
        email=$5,
        mobile=$6,
        preferredContact=$7,
        city=$8,
        state=$9,
        zip=$10,
        address1=$11,
        address2=$12,
        role=$13,
        organization=$14
        WHERE email=$15`, [firebase_id, firstname, lastname, username, email, mobile, preferredcontact, city, state, zip, address1, address2, role, organization, ogemail]);
      return 'Post Successful';
    } catch(err) {
      console.log(err);
      return err;
    }
  },
}
  // <TEMPLATE>: async (req, res) => {
  //   try {
  //     let data = await get.<TEMPLATE>(req.query);
  //     res.status(200).json(data);
  //   } catch(err) {
  //     console.log(err);
  //     res.status(400).send(err);
  //   }
  // }
