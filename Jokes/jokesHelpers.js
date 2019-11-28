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

module.exports = {
    getPublicJokes,
    getAllJokes,
    getJokesbyUserID,
}