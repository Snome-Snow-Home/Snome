const { get, helpers } = require('../models');
const user = require('../models/user')
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authenticate = (pass1, pass2) => {
  return bcrypt.compareSync(pass1, pass2)
  // return pass1 === pass2
}

module.exports = {

  login: async (req, res) => {
    console.log('credentials: ', req.body.username, req.body.password)
    // res.send(['input controller working', req.body.name, req.body.password])
    try {
      const auth_user = await user.getUserByName(req.body.username);


      let is_auth = authenticate(req.body.password, auth_user.password)


      if (!is_auth) throw new Error('credentials did not match')
      const token = jsonwebtoken.sign('abc', '123');
      console.log(token)
      res.header("auth-token", token)
      res.status(200).send({ auth_user, token });
    } catch (err) {
      console.log(`SERVER SIDE ERROR - POST: ${err}`);
      res.status(500).send(err);
    }
  },

  createUser: async (req, res) => {
    try {
      const response = await user.createUser(req.body);
      res.status(201).send("User Created");
    } catch (err) {
      console.log(`SERVER SIDE ERROR - POST: ${err}`);
      res.status(500).send(err);
    }

  },

  updateUser: async (req, res) => {
    try {
      await user.updateUser(req.params.id, req.body);
      res.status(202).send('Updated Successfuly');
    } catch (err) {
      console.log(`SERVER ERROR - PUT:  ${err}`);
      return err;
    }
  },

  getUser: async (req, res) => {
    try {
      let data = await user.getUser(req.params.id);
      res.status(200).send(data);
    } catch (err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(400).send(err);
    }
  },

  getUserByName: async (req, res) => {
    try {
      console.log(req.params.name);
      let data = await user.getUserByName(req.params.name);
      res.status(200).send(data);
    } catch (err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(400).send(err);
    }
  },

  getAllUsers: async (req, res) => {
    try {
      let data = await user.getAllUsers();
      res.status(200).send(data);
    } catch (err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(400).send(err);
    }
  },

  checkForEmail: async (req, res) => {
    try {
      let data = await user.checkForEmail(req.params.email);
      res.status(200).send(data);
    } catch (err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(400).send(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      await user.deleteUser(req.params.id);
      res.status(202).send("User Deleted")
    } catch (err) {
      console.log(`SERVER ERROR - DELETE: ${err}`);
      res.status(400).send(err);
    }
  },

}