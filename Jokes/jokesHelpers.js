const db = require('../database/dbConfig');

function getPublicJokes() {
    return db('jokes').where({private: 0})
}

module.exports = {
    getPublicJokes,
}