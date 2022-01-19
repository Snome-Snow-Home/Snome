const { get, helpers } = require('../models');
const user = require('../models/user')

module.exports = {

  login: async (req, res) => {
    console.log(req.body.name)
    res.send(['input controller working', req.body.name, req.body.password])
  },

  createUser: async (req, res) => {
    try {
      const response = await user.createUser(req.body);
      res.status(201).send(response);
    } catch(err) {
      console.log(`SERVER SIDE ERROR - POST: ${err}`);
      res.status(500).send(err);
    }
  },

  updateUser: async (req, res) => {
    try {
      await user.updateUser(req.params.id, req.body);
      res.status(202).send('Updated Successfuly');
    } catch(err) {
      console.log(`SERVER ERROR - PUT:  ${err}`);
      return err;
    }
  },

  getUser: async (req, res) => {
    try {
      let data = await user.getUser(req.params.id);
      res.status(200).send(data);
    } catch(err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(400).send(err);
    }
  },

  getUserByName: async (req, res) => {
    try {
      let data = await user.getUserByName(req.params.name);
      res.status(200).send(data);
    } catch(err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(400).send(err);
      res.status(400).send(undefined);
    }
  },

  getAllUsers: async (req, res) => {
    try {
      let data = await user.getAllUsers();
      res.status(200).send(data);
    } catch(err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(400).send(err);
    }
  },

  checkForEmail: async (req, res) => {
    try {
      let data = await user.checkForEmail(req.params.email);
      res.status(200).send(data);
    } catch(err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(400).send(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      await user.deleteUser(req.params.id);
      res.status(202).send("User Deleted")
    } catch(err) {
      console.log(`SERVER ERROR - DELETE: ${err}`);
      res.status(400).send(err);
    }
  },

}