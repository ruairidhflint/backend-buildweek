const db = require('../database/dbConfig');

function getPublicJokes() {
    return db('jokes')
        .where({ private: 0 })
}

function getAllJokes() {
    return db('jokes');
}

function getJokesbyUserID(userID) {
    return db('jokes')
      .where({ user_id: userID });
  }

  function postNewJokeByUserID(newTab) {
    return db('jokes')
      .insert(newTab, 'id');
  }

module.exports = {
    getPublicJokes,
    getAllJokes,
    getJokesbyUserID,
    postNewJokeByUserID,
}