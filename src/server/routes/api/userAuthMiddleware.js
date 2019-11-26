const jwt = require('jsonwebtoken');

const keys = require('config/keys');
const { User } = require('models');

const userAuthMiddleware = (req, res, next) => {
  const authorizationHeader = req.header('Authorization');
  const token = authorizationHeader.split(' ')[1];

  jwt.verify(token, keys.secretOrKey, (err, decoded) => {
    if (err) {
      console.error(`Invalid authorization header: ${token}`);
      return res.sendStatus(401);
    }

    User.findById(decoded.id, (err, user) => {
      if (err) {
        console.error(`Unknown user id: ${decoded.id}`);
        return res.sendStatus(401);
      }

      req.session.userId = user.id;
      next();
    });
  });
};

module.exports = userAuthMiddleware;
