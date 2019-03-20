import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8082');

export const subscribeToChatEvents = callback => {
  socket.on('new chat', chat => callback(chat));
};

export const subscribeToUserEvents = callback => {
  socket.on('user joined', usernames => callback(usernames));
  socket.on('user left', usernames => callback(usernames));
};

export const emitNewChat = chat => {
  socket.emit('new chat', chat);
};

export const emitAddedUser = username => {
  socket.emit('add user', username);
};
