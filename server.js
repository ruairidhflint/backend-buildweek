const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const data = require('./temporaryData');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json(data);
});

module.exports = server;
