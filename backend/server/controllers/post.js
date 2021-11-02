const { post } = require('../models');

module.exports = {
  offers: async (req, res) => {
    try {
      let data = await post.offers(req.body);
      res.status(200).send(data)
    } catch(err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  // post function from models
  requests: async(req, res) => {
    try {
      let data = await post.requests(req.body);
      res.send(data)
    } catch(err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  profile: async(req, res) => {
    try {
      let data = await post.profile(req.body);
      res.send(data)
    } catch(err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  comments: async (req, res) => {
    try {
      let data = await post.comments(req.body);
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