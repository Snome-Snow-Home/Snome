const { get, helpers } = require('../models');
const address = require('../models/address')

module.exports = {

  getAddress: async (req, res) => {
    try {
      const response = await address.getAddress(req.params);
      res.status(201).send(response);
    } catch(err) {
      console.log(`SERVER ERROR - GET:  ${err}`);
      return err;
    }
  },

}