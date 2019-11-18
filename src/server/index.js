'use strict';

const connectMongo = require('connect-mongo');
const bodyParser = require('body-parser');
const express = require('express');
const expressSession = require('express-session');
const http = require('http');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const socketIO = require('socket.io');

const config = require('./config/keys');
const User = require('./models/User');
const messages = require('./routes/api/messages');
const users = require('./routes/api/users');
const initializeWebsocketServer = require('./websocket.js');

const PORT = process.env.PORT || 8082;
const app = express();
const httpServer = http.Server(app);
const MongoStore = connectMongo(expressSession);

// Setup Websocket Server
const io = socketIO(httpServer);
initializeWebsocketServer(io);

// Setup MongoDB
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB successfully connected')) // eslint-disable-line
  .catch(err => console.log(err)); // eslint-disable-line
const mongooseConnection = mongoose.connection;

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
app.use(
  expressSession({
    secret: process.env.CHATROOM_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection
    })
  })
);
app.use(passport.initialize());
app.use('/api/users', users);
app.use('/api/messages', messages);

const authMiddleware = (req, res, next) => {
  User.findById(req.session.userId).exec(function(error, user) {
    if (user) {
      return next();
    }
    return res.sendStatus(401);
  });
};

app.get('/secret', authMiddleware, (req, res) => {
  return res.send('You are in!');
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '../../../dist/index.html'));
});

httpServer.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); // eslint-disable-line
