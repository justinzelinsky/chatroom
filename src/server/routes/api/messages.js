const express = require('express');

const Message = require('../../models/Message');

const router = express.Router();

router.get('/', function(req, res) {
  Message.find({}).then(messages => res.json(messages));
});

router.post('/clear', function(req, res) {
  Message.deleteMany({}, err => {
    if (err) {
      res.status(500).send(err);
    }
    res.sendStatus(200);
  });
});

module.exports = router;
