const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const UserRoutes = require('./Users/userRoutes');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/users', UserRoutes);

server.get('/', (req, res) => {
  res.status(200).json({ API: 'Working' });
});

module.exports = server;
