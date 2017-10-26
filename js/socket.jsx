import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

export function subscribeToChatEvents(callback) {
    socket.on('new chat', chat => callback(chat));
}
export function subscribeToUserEvents(callback) {
    socket.on('user joined', usernames => callback(usernames));
    socket.on('user left', usernames => callback(usernames));
}

export function emitNewChat(chat) {
    socket.emit('new chat', chat);
}

export function emitAddedUser(username) {
    socket.emit('add user', username);
}
