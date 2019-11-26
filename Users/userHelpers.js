const db = require('../database/dbConfig');

function getAllUsers() {
  return db('users')
    .select('username', 'id');
}

module.exports = {
  getAllUsers,
};
