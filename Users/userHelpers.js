const db = require('../database/dbConfig');

function getAllUsers() {
  return db('users')
    .select('username', 'id', 'password');
}

function getUserByUsername(username) {
  return db('users')
    .where({ username })
    .first();
}

function addNewUser(newUser) {
  return db('users')
    .insert(newUser, 'id');
}

function deleteUser(id) {
  return db('users')
    .where({ id })
    .del();
}

module.exports = {
  getUserByUsername,
  addNewUser,
  deleteUser,
  getAllUsers,
};
