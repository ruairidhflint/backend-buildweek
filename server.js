const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const UserRoutes = require('./Users/userRoutes');
const JokeRoutes = require('./Jokes/jokesRoutes');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/users', UserRoutes);
server.use('/jokes', JokeRoutes);

server.get('/', (req, res) => {
  res.status(200).json({ API: 'Working', DATABASE: process.env.DB_ENV });
});

module.exports = server;
