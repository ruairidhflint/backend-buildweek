const db = require('../database/dbConfig');

function getPublicJokes() {
    return db('jokes')
        .where({ private: 0 })
}

function getAllJokes() {
    return db('jokes');
}

module.exports = {
    getPublicJokes,
    getAllJokes,
}