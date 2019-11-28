const express = require('express');
const db = require('./jokesHelpers');
const authMiddleware = require('../Authentication/restrictedRoute');

const Router = express.Router();

Router.get('/public', (req, res) => {
    db.getPublicJokes()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ err });
        })
})

Router.get('/all', authMiddleware.restrictedRoute, (req, res) => {
    db.getAllJokes()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ err });
        })
});

Router.get('/user', authMiddleware.restrictedRoute, (req, res) => {
    const { id } = req.decodedToken;
    db.getJokesbyUserID(id)
      .then((data) => {
        if (data.length) {
          res.status(200).json(data);
        } else {
          res.status(200).json("No Jokes Found!");
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });


module.exports = Router;