'use strict';

const bodyParser = require('body-parser');
const config = require('./config/keys');
const express = require('express');
const http = require('http');
const initializeWebsocketServer = require('./websocket.js');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const users = require('./routes/api/users');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 8082;
const app = express();
const httpServer = http.Server(app);

// Setup Websocket Server
const io = socketIO(httpServer);
initializeWebsocketServer(io);

// Setup MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB successfully connected')) // eslint-disable-line
  .catch(err => console.log(err)); // eslint-disable-line

const configurePassport = require('./config/configurePassport');
configurePassport(passport);

// Setup Express
app.use(express.static('dist'));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/api/users', users);
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '../../../dist/index.html'));
});

httpServer.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); // eslint-disable-line
