/* eslint-disable */
const express = require('express');

const app = express();

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'adrie',
  host: 'localhost',
  database: 'toto',
  password: 'root',
  port: 5432,
});

pool.query('SELECT * from bipou where id = 1').then((response) => {
  console.log(response.rows);
});
