const db = require('../database/dbConfig');

function getPublicJokes() {
  return db('jokes')
    .where({ privated: 0 });
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

function postNewJokeByUserID(newJoke) {
  return db('jokes')
    .insert(newJoke, 'id');
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
