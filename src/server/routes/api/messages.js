const express = require('express');

const { Message } = require('models');
const adminAuthMiddleware = require('./adminAuthMiddleware');
const userAuthMiddleware = require('./userAuthMiddleware');

const router = express.Router();

router.get('/', userAuthMiddleware, (req, res) => {
  Message.find({}).then(messages => res.json(messages));
});

router.post('/clear', userAuthMiddleware, adminAuthMiddleware, (req, res) => {
  Message.deleteMany({}, err => {
    if (err) {
      res.status(500).send(err);
    }
    res.sendStatus(200);
  });
});

module.exports = router;
