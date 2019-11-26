require('dotenv').config();
const express = require('express');

const server = express();

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
