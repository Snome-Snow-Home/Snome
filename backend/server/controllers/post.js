const { post } = require('../models');

/* define post request handlers here */

module.exports = {
  create: async (req, res) => {
    try {
      await post.create(req.body);
      res.status(201).send('Success!');
    } catch(err) {
      console.log(`SERVER SIDE ERROR - POST: ${err}`)
      res.status(400).send(err);
    }
  }
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