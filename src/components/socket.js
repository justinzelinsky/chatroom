import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8082');

export const subscribeToChatEvents = callback => {
  socket.on('new chat', chat => callback(chat));
};

export const subscribeToUserLeft = callback => {
  socket.on('user left', username => callback(username));
};

export const subscribeToUserJoin = callback => {
  socket.on('user joined', username => callback(username));
};

export const emitNewChat = chat => {
  socket.emit('new chat', chat);
};

export const emitAddedUser = username => {
  socket.emit('add user', username);
};
