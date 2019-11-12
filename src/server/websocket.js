const dayjs = require('dayjs');

const initializeWebsocketServer = io => {
  const connectedUsers = [];

  const NEW_CHAT = 'new chat';
  const NEW_ADMIN_CHAT = 'new admin chat';
  const USER_JOINED = 'user joined';
  const USER_LEFT = 'user left';
  const ADD_USER = 'add user';

  io.on('connection', socket => {
    let addedUser = false;

    socket.on(NEW_CHAT, chat => socket.broadcast.emit(NEW_CHAT, chat));

    socket.on(ADD_USER, username => {
      if (addedUser) {
        return;
      }

      socket.username = username;
      connectedUsers.push(username);
      addedUser = true;

      io.emit(USER_JOINED, connectedUsers);

      socket.broadcast.emit(NEW_ADMIN_CHAT, {
        isAdminMessage: true,
        username: 'Admin',
        ts: dayjs().format('HH:mm'),
        message: `${socket.username} has joined the chat`
      });
    });

    socket.on('disconnect', function() {
      if (addedUser) {
        connectedUsers.splice(connectedUsers.indexOf(socket.username));

        io.emit(USER_LEFT, connectedUsers);

        socket.broadcast.emit(NEW_ADMIN_CHAT, {
          isAdminMessage: true,
          username: 'Admin',
          ts: dayjs().format('HH:mm'),
          message: `${socket.username} has left the chat`
        });
      }
    });
  });
};

module.exports = initializeWebsocketServer;
