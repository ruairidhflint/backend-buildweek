const db = require('../database/dbConfig');

function getPublicJokes() {
  return db('jokes')
    .where({ private: 0 });
}

function getAllJokes() {
  return db('jokes');
}

function getJokesbyUserID(userID) {
  return db('jokes')
    .where({ user_id: userID });
}

function getJokeByID(id) {
  return db('jokes')
    .where({ id })
    .first();
}

function postNewJokeByUserID(newTab) {
  return db('jokes')
    .insert(newTab, 'id');
}

function deleteJokeByJokeID(id) {
  return db('jokes')
    .where({ id })
    .del();
}

function updateJokeByID(updatedJoke, id) {
  return db('jokes')
    .where({ id })
    .update(updatedJoke, 'id');
}

module.exports = {
  getPublicJokes,
  getAllJokes,
  getJokesbyUserID,
  postNewJokeByUserID,
  deleteJokeByJokeID,
  updateJokeByID,
  getJokeByID,
};
