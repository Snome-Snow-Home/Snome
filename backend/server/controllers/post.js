const { post } = require('../models');

/* define post request handlers here */

module.exports = {
  create: async (req, res) => {
    try {
      let data = await create.post(req.body);
      res.status(201).send(data);
    } catch(err) {
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