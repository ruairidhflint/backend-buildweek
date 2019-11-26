const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('../Authentication/tokenGenerator');
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

Router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.getUserByUsername(username)
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.generateToken(user);
        res.status(200).json({ token, username: user.username, id: user.id });
      } else {
        res.status(401).json({ message: 'Invalid login credentials' });
      }
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

module.exports = Router;
