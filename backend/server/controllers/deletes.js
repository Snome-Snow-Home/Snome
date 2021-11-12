const { deletes }  = require('../models');
/* define delete request handlers here */

module.exports = {

  deleteSnome: async (req, res) => {
    try {
      await deletes.deleteSnome(req.params.id);
      res.status(202).send('Snome Deleted');
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