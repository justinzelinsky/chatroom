import openSocketClient from 'socket.io-client';

let socket = null;

export const subscribeToChatEvents = callback => {
  socket.on('new chat', chat => callback(chat));
};

export const subscribeToAdminChatEvents = callback => {
  socket.on('new admin chat', chat => callback(chat));
};

export const subscribeToUserEvents = callback => {
  socket.on('user joined', username => callback(username));
  socket.on('user left', username => callback(username));
};

export const subscribeToTypingEvents = callback => {
  socket.on('users typing', usersTyping => callback(usersTyping));
};

export const emitStartTyping = user => {
  socket.emit('user start typing', user);
};

export const emitStopTyping = user => {
  socket.emit('user stop typing', user);
};

export const emitNewChat = chat => {
  socket.emit('new chat', chat);
};

export const emitAddedUser = username => {
  socket.emit('add user', username);
};

export const openSocket = () => (socket = openSocketClient(API_ADDRESS));

export const closeSocket = () => socket.close();
