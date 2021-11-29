const { remove, helpers }  = require('../models');
/* define delete request handlers here */

module.exports = {

  delete: async (req, res) => {
    try {
      const model = helpers.getModelFromUrl(req);
      await remove.delete(req.params.id, model);
      res.status(202).send('Snome Deleted');
    } catch(err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      await remove.deleteUser(req.params.id);
      res.status(202).send("User Deleted")
    } catch(err) {
      console.log(`SERVER ERROR - DELETE: ${err}`);
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