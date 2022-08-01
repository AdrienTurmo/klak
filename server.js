/* eslint-disable */
const express = require('express');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3006;

const db = require('./database');

const app = express()
  .use(express.static(__dirname + './build'))
  .use((req, res) => res.sendFile(__dirname + '/build/index.html'))
  .listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

db.toto('hello');

// console.log('gettingArmy');
// db.getArmy('CVV6');

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
    socket.emit('RETURNTOSENDER', {
      data: 'ploup',
    });
  });

  socket.on('GET_ARMY', (armyName) => {
    console.log('GET_ARMY', armyName);
    db.getArmy(armyName).then((army) => {
      console.log('GOT_ARMY emit', army);
      socket.emit('GOT_ARMY', army);
    });
  });
});
