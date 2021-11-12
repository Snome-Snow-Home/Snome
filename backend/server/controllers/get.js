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
<<<<<<< HEAD
    try {
      const id = req.params.id;
      const model = get.getModelFromUrl(req);
      const data = await get.getOne(id, model);
=======
    const test = req;
    console.log(`This is test: ${req.params.id}`);
    const model = req.path.slice(1);
    try {
      let data = await get.getOne(req.params.id, model);
>>>>>>> 80ac58a93a1ca7f7de81116e3466d0074ed0293c
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