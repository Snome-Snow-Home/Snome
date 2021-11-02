const { put } = require('../models');

module.exports = {
  profile: async(req, res) => {
    try {
      let data = await put.profile(req.body);
      res.send(data);
    } catch(err) {
      console.log(err);
      res.status(400).send(err);
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