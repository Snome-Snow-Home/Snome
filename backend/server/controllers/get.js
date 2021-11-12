const { get } = require('../models');

/* define get request handlers here */

module.exports = {

  getAll: async (req, res) => {
    try {
      const model = req.path.slice(1);
      console.log(model)  // TEST
      // res.status(200).send(model);  // DUMMY RESPONSE
      let data = await get.getAll(model);
      res.status(200).send(data);
    } catch(err) {
      console.log(`SERVER ERROR: ${err}`)
      res.status(400).send(err);
    }
},

  getOne: async (req, res) => {
    const test = req;
    const model = req.path.slice(1);
    try {
      let data = await get.getOne(req.params.id, model);
      res.status(200).send(data);
    } catch(err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(404).send(err);
    }
  },

  getUser: async (req, res) => {
    console.log(req.params.id);
    try {
      let data = await get.getUser(req.params.id);
      res.status(200).send(data);
    } catch(err) {
      console.log(`SERVER ERROR: ${err}`);
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

};