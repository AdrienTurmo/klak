/* eslint-disable */

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

const toto = (truc) =>
  client.query('SELECT * from bipou where id = 1').then((response) => {
    console.log(response.rows, truc);
  });

module.exports = {
  toto,
};
