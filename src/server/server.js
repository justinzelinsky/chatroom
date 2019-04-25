'use strict';

const bodyParser = require('body-parser');
const config = require('./config/keys');
const connectMongo = require('connect-mongo');
const express = require('express');
const http = require('http');
const initializeWebsocketServer = require('./websocket.js');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const User = require('./models/User');
const users = require('./routes/api/users');
const session = require('express-session');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 8082;
const app = express();
const httpServer = http.Server(app);
const MongoStore = connectMongo(session);

// Setup Websocket Server
const io = socketIO(httpServer);
initializeWebsocketServer(io);

// Setup MongoDB
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true })
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
  session({
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

const authMiddleware = (req, res, next) => {
  User.findById(req.session.userId).exec(function(error, user) {
    if (user) {
      return next();
    }
    return res.send('Go Away!');
  });
};

app.get('/secret', authMiddleware, (req, res) => {
  return res.send('You are in!');
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '../../../dist/index.html'));
});

httpServer.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); // eslint-disable-line
