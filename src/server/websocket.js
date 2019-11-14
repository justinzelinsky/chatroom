const dayjs = require('dayjs');

const Message = require('./models/Message');

const initializeWebsocketServer = io => {
  const connectedUsers = [];

  const NEW_CHAT = 'new chat';
  const NEW_ADMIN_CHAT = 'new admin chat';
  const USER_JOINED = 'user joined';
  const USER_LEFT = 'user left';
  const ADD_USER = 'add user';

  io.on('connection', socket => {
    let addedUser = false;

    socket.on(NEW_CHAT, chat => {
      const message = new Message({
        user: chat.user,
        message: chat.message,
        ts: chat.ts,
        isAdminMessage: Boolean(chat.isAdminMessage)
      });
      message.save().then(() => socket.broadcast.emit(NEW_CHAT, chat));
    });

    socket.on(ADD_USER, user => {
      if (addedUser) {
        return;
      }

      socket.user = user;
      connectedUsers.push(user);
      addedUser = true;

      io.emit(USER_JOINED, connectedUsers);

      socket.broadcast.emit(NEW_ADMIN_CHAT, {
        isAdminMessage: true,
        username: 'Admin',
        ts: dayjs().format('HH:mm'),
        message: `${socket.user.name} has joined the chat`
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
