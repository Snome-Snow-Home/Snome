const { remove }  = require('../models');
/* define delete request handlers here */

module.exports = {

  remove: async (req, res) => {
    try {
      const id = req.params.id;
      const model = remove.getModelFromUrl(req);
      const data = await remove.remove(id, model);
      res.status(200).send('Deleted!');
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

};