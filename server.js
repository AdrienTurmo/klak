/* eslint-disable */
const express = require('express');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3006;

const db = require('./database');

const app = express()
  .use(express.static('./build'))
  .use((req, res) => res.sendFile('/build/index.html'))
  .listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

db.toto('hello');

const io = new Server(app, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('CONNECTION!');
  db.toto('connection');

  socket.on('TOTOTO', () => {
    console.log('TOTOTO');
  });
});
