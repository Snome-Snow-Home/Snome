const { get } = require('../models');

/* define get request handlers here */

module.exports = {
  //===Snome, Location, Match===//
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
  //===Snome, Location, Match===//
  getOne: async (req, res) => {
<<<<<<< HEAD
    const test = req;
    const model = req.path.slice(1);
=======
>>>>>>> 82105b262baafb8c31fef4a63f0743fc4fbbb679
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
  //===Location===//
  filterLocationsOnSearch: async (req, res) => {
    try {

<<<<<<< HEAD
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

=======
    } catch (err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(404).send(err);
    }
  }
>>>>>>> 82105b262baafb8c31fef4a63f0743fc4fbbb679
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