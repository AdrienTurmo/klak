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

const io = new Server(app, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.on('GET_ARMY', (armyName) => {
    console.log('GET_ARMY', armyName);
    db.getArmy(armyName).then((army) => {
      console.log('GOT_ARMY emit', army);
      socket.emit('GOT_ARMY', army);
    });
  });
});
