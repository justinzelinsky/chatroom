const express = require('express');

const Message = require('../../models/Message');

const router = express.Router();

router.get('/', function(req, res) {
  Message.find({}).then(messages => res.json(messages));
});

module.exports = router;
