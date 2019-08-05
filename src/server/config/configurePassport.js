const PassportJWT = require('passport-jwt');
const mongoose = require('mongoose');
const keys = require('./keys');

const JwtStrategy = PassportJWT.Strategy;
const ExtractJwt = PassportJWT.ExtractJwt;
const User = mongoose.model('users');
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretOrKey
};

const configurePassport = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => done(null, user || false))
        .catch(err => console.log(err)); // eslint-disable-line
    })
  );
};

module.exports = configurePassport;
