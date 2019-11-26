const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./userHelpers');
const Helpers = require('./userHelpers');

const Router = express.Router();

Router.get('/', (req, res) => {
  Helpers.getAllUsers()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

Router.post('/signup', (req, res) => {
  const newUserDetails = req.body;
  const { username, password } = newUserDetails;
  const hashedPassword = bcrypt.hashSync(password, 12);
  const newUser = {
    username,
    password: hashedPassword,
  };

  db.addNewUser(newUser)
    .then((data) => {
      res.status(202).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = Router;
