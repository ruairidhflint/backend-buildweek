const express = require('express');
const db = require('./jokesHelpers');

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



module.exports = Router;