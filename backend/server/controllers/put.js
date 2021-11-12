const { put } = require('../models');

/* define put request handlers here */

module.exports = {
  updateSnome: async (req, res) => {
    try {
      let data = await put.updateSnome(req.params.id, req.body);
      res.status(201).send('Success!')
    } catch(err) {
      console.log(`SERVER ERROR - PATCH: ${err}`);
      res.status(409).send(err);
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