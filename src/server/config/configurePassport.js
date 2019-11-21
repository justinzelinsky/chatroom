const mongoose = require('mongoose');
const { ExtractJwt, Strategy } = require('passport-jwt');

const keys = require('./keys');

const configurePassport = passport => {
  const User = mongoose.model('users');
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secretOrKey
  };
  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => done(null, user || false))
        .catch(err => console.log(err)); // eslint-disable-line
    })
  );
};

module.exports = configurePassport;
