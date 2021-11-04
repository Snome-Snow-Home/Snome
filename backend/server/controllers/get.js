const { get } = require('../models');

/* define get request handlers here */

module.exports = {

  getAllSnomes: async (req, res) => {
    try {
      let data = await get.getAll(req.query);
      res.status(200).send(data);
    } catch(err) {
      console.log(`SERVER SIDE ERROR: ${err}`)
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

};