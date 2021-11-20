const { get } = require('../models');

/* define get request handlers here */

module.exports = {
  getAll: async (req, res) => {
    try {
      const model = get.getModelFromUrl(req);
      let data = await get.getAll(model, req.query);
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

  getUser: async (req, res) => {
    try {
      let data = await get.getUser(req.params.id);
      res.status(200).send(data);
    } catch(err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(400).send(err);
    }
  },
  // filterLocationsOnSearch: async (req, res) => {
  //   try {

  getAllUsers: async (req, res) => {
    try {
      let data = await get.getAllUsers();
      res.status(200).send(data);
    } catch(err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(400).send(err);
    }
  },
  // for navbar - to alert user when their property has been liked //
  getUnreadLikes: async (req, res) => {
    const user_id = req.params.user_id;
    get.getUnreadLikes(user_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(
      "Some error occurred while fetching unread Likes."
      )
    })
  },

  getSnomeReviews: async (req, res) => {
    try {
      const snome_id = req.params.id;
      // const snome_user_id = req.params.snome_user_id;
      // console.log(req)
      let data = await get.getSnomeReviews(snome_id);
      res.status(200).send(data);
    } catch (err) {
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