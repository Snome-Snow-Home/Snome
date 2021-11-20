const { post } = require('../models');

/* define post request handlers here */

module.exports = {
  createSnome: async (req, res) => {
    try {
      await post.createSnome(req.body);
      res.status(201).send('Created!');
    } catch(err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  createUser: async (req, res) => {
    try {
      await post.createUser(req.body);
      res.status(201).send('Created!');
    } catch(err) {
      console.log(`SERVER SIDE ERROR - POST: ${err}`);
      res.status(400).send(err);
    }
  },

  createLike: async (req, res) => {
    post.createLike(req.body)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send(
        "Some error occurred while creating the Like."
        )
      })

    },

  createMatch: async (req, res) => {
    try {
      await post.createMatch(req.body);
      res.status(201).send('Created!')
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