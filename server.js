/* eslint-disable */
const express = require('express');

const PORT = process.env.PORT || 3006;
const app = express();

// const Pool = require('pg').Pool;
// const pool = new Pool({
//   user: 'adrie',
//   host: 'localhost',
//   database: 'toto',
//   password: 'root',
//   port: 5432,
// });
//
// const toto = () =>
//   pool.query('SELECT * from bipou where id = 1').then((response) => {
//     console.log(response.rows);
//   });

app
  .use(express.static('./build'))
  .use((req, res) => res.sendFile('/build/index.html'))
  .listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
