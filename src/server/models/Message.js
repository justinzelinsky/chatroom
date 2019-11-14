const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const MessageSchema = new Schema({
  user: {
    type: Map,
    of: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  ts: {
    type: Number,
    required: true
  },
  isAdminMessage: {
    type: Boolean,
    required: true
  }
});
const Message = mongoose.model('messages', MessageSchema);

module.exports = Message;
