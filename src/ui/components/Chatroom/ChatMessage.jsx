import './ChatMessage.scss';

import classnames from 'classnames';
import {
  bool,
  shape,
  string
} from 'prop-types';
import React from 'react';

const ChatMessage = ({ chat }) => {
  const chatStyleName = classnames('chat-message', { 'admin-message': chat.isAdminMessage });
  return (
    <div styleName="chat">
        <div styleName="timestamp">
          {chat.ts}
        </div>
        <div styleName="username">
          {chat.username}
        </div>
        <div styleName={chatStyleName}>
          {chat.message}
        </div>
    </div>
  );
};

ChatMessage.propTypes = {
  chat: shape({
    isAdminMessage: bool.isRequired,
    message: string.isRequired,
    ts: string.isRequired,
    username: string.isRequired
  }).isRequired
};

export default ChatMessage;
