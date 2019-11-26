const express = require('express');
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

module.exports = Router;
