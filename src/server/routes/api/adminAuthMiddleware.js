const { User } = require('models');

const adminAuthMiddleware = (req, res, next) => {
  const id = req.session.userId;

  if (!id) {
    return res.sendStatus(401);
  }

  User.findById(id, (err, user) => {
    if (err) {
      console.error(`Unknown user id: ${id}`);
      return res.sendStatus(401);
    }

    if (user.admin) {
      next();
    }

    return res.sendStatus(401);
  });
};

module.exports = adminAuthMiddleware;
