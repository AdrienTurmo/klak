/* eslint-disable */
const express = require('express');

const PORT = process.env.PORT || 3006;
const app = express();

const db = require('./database');

app
  .use(express.static('./build'))
  .use((req, res) => res.sendFile('/build/index.html'))
  .listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

db.toto();
console.log(process.env.DATABASE_URL);
