'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 8082;

app.use(express.static('public'));

const connectedUsers = [];

const NEW_CHAT = 'new chat';
const USER_JOINED = 'user joined';
const USER_LEFT = 'user left';
const ADD_USER = 'add user';

io.on('connection', function(socket) {
  let addedUser = false;
  
  socket.on(NEW_CHAT, function(chat) {
    socket.broadcast.emit(NEW_CHAT, chat);
  });

  socket.on(ADD_USER, function(username) {
    if (addedUser) 
      return;
    
    socket.username = username;
    connectedUsers.push(username);
    addedUser = true;

    io.emit(USER_JOINED, connectedUsers);

    socket.broadcast.emit(NEW_CHAT, {
      isSystemMessage: true,
      message: socket.username + ' has joined the chat'
    });
  });

  socket.on('disconnect', function() {
    if (addedUser) {
      connectedUsers.splice(connectedUsers.indexOf(socket.username));

      io.emit(USER_LEFT, connectedUsers);

      socket.broadcast.emit(NEW_CHAT, {
        isSystemMessage: true,
        message: socket.username + ' has left the chat'
      });
    }
  });
});

http.listen(PORT, function() {
  console.log('listening on *:', PORT); // eslint-disable-line
});
