const dayjs = require('dayjs');

const initializeWebsocketServer = io => {
  const connectedUsers = [];

  const NEW_CHAT = 'new chat';
  const NEW_ADMIN_CHAT = 'new admin chat';
  const USER_JOINED = 'user joined';
  const USER_LEFT = 'user left';
  const ADD_USER = 'add user';

  io.on('connection', function(socket) {
    let addedUser = false;

    socket.on(NEW_CHAT, function(chat) {
      socket.broadcast.emit(NEW_CHAT, chat);
    });

    socket.on(ADD_USER, function(username) {
      if (addedUser) return;

      socket.username = username;
      connectedUsers.push(username);
      addedUser = true;

      io.emit(USER_JOINED, connectedUsers);

      const userHasJoinedChat = {
        isAdminMessage: true,
        username: 'Admin',
        ts: dayjs().format('HH:mm'),
        message: socket.username + ' has joined the chat'
      };

      socket.broadcast.emit(NEW_ADMIN_CHAT, userHasJoinedChat);
    });

    socket.on('disconnect', function() {
      if (addedUser) {
        connectedUsers.splice(connectedUsers.indexOf(socket.username));

        io.emit(USER_LEFT, connectedUsers);

        const userHasLeftChat = {
          isAdminMessage: true,
          username: 'Admin',
          ts: dayjs().format('HH:mm'),
          message: socket.username + ' has left the chat'
        };

        socket.broadcast.emit(NEW_ADMIN_CHAT, userHasLeftChat);
      }
    });
  });
};

module.exports = initializeWebsocketServer;
