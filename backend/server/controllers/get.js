const { get } = require('../models');

/* define get request handlers here */

module.exports = {
  getAll: async (req, res) => {
    try {
      const model = get.getModelFromUrl(req);
      //res.status(200).send(model);  // DUMMY RESPONSE
      let data = await get.getAll(model);
      res.status(200).send(data);
    } catch(err) {
      console.log(`SERVER ERROR: ${err}`)
      res.status(400).send(err);
    }
},
  getOne: async (req, res) => {
    try {
      const id = req.params.id;
      const model = get.getModelFromUrl(req);
      const data = await get.getOne(id, model);
      res.status(200).send(data);
    } catch(err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(404).send(err);
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

};