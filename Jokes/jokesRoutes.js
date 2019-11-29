const express = require('express');
const db = require('./jokesHelpers');
const authMiddleware = require('../Authentication/restrictedRoute');
const middleware = require('./jokesMiddleware');

const Router = express.Router();

Router.get('/public', (req, res) => {
  db.getPublicJokes()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

Router.get('/all', authMiddleware.restrictedRoute, (req, res) => {
  db.getAllJokes()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

Router.get('/user', authMiddleware.restrictedRoute, (req, res) => {
  const { id } = req.decodedToken;
  db.getJokesbyUserID(id)
    .then((data) => {
      if (data.length) {
        res.status(200).json(data);
      } else {
        res.status(200).json('No Jokes Found!');
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

Router.post('/new-joke', authMiddleware.restrictedRoute, middleware.checkPostIsValid, (req, res) => {
  const { id } = req.decodedToken;
  const { joke_q, joke_a, privated } = req.body;

  const newJoke = {
    joke_q, joke_a, privated, user_id: id,
  };
  db.postNewJokeByUserID(newJoke)
    .then(() => {
      res.status(200).json({ message: 'Success', data: newJoke });
    })
    .catch(() => {
      res.status(500).json({ message: 'Post failed' });
    });
});

Router.delete('/joke/:id', authMiddleware.restrictedRoute, middleware.checkJokeIDIsValid, (req, res) => {
  const { id } = req.params;
  const requiredUserID = req.userID;
  const userID = req.decodedToken.id;
  if (requiredUserID === userID) {
    db.deleteJokeByJokeID(id)
      .then(() => {
        res.status(200).json({ message: 'Success!' });
      })
      .catch((err) => {
        res.status(500).json({ err, message: 'Error!' });
      });
  } else {
    res.status(403).json({ message: 'Invalid permissions' });
  }
});

Router.put('/joke/:id', authMiddleware.restrictedRoute, middleware.checkJokeIDIsValid, middleware.checkPostIsValid, (req, res) => {
  const { id } = req.params;
  const userID = req.decodedToken.id;
  const updatedJoke = {
    joke_q: req.body.joke_q,
    joke_a: req.body.joke_a,
    privated: req.body.privated,
    user_id: userID,
  };
  if (req.userID === Number(userID)) {
    db.updateJokeByID(updatedJoke, id)
      .then(() => {
        res.status(202).json(updatedJoke);
      })
      .catch(() => {
        res.status(500).json({ message: 'error!' });
      });
  } else {
    res.status(403).json({ message: 'error!' });
  }
});

module.exports = Router;
