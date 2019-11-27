const Message = require('./models/Message');

const adminUser = {
  name: 'Admin'
};

const initializeWebsocketServer = io => {
  let connectedUsers = [];
  let usersTyping = [];

  const NEW_CHAT = 'new chat';
  const NEW_ADMIN_CHAT = 'new admin chat';
  const USER_JOINED = 'user joined';
  const USER_LEFT = 'user left';
  const ADD_USER = 'add user';
  const USER_START_TYPING = 'user start typing';
  const USER_STOP_TYPING = 'user stop typing';
  const USERS_TYPING = 'users typing';

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

    socket.on(USER_START_TYPING, user => {
      usersTyping.push(user);
      socket.broadcast.emit(USERS_TYPING, usersTyping);
    });

    socket.on(USER_STOP_TYPING, user => {
      usersTyping = usersTyping.filter(typingUser => typingUser.id !== user.id);
      socket.broadcast.emit(USERS_TYPING, usersTyping);
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
        user: adminUser,
        ts: new Date().valueOf(),
        message: `${socket.user.name} has joined the chat`
      });
    });

    socket.on('disconnect', function() {
      if (addedUser) {
        connectedUsers = connectedUsers.filter(
          user => user.id !== socket.user.id
        );

        io.emit(USER_LEFT, connectedUsers);

        socket.broadcast.emit(NEW_ADMIN_CHAT, {
          isAdminMessage: true,
          user: adminUser,
          ts: new Date().valueOf(),
          message: `${socket.user.name} has left the chat`
        });
      }
    });
  });
};

module.exports = initializeWebsocketServer;
