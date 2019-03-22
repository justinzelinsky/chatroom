import './ChatMessage.scss';

import classnames from 'classnames';
import {
  bool,
  shape,
  string
} from 'prop-types';
import React from 'react';

const ChatMessage = ({ chat }) => {
  const { isSystemMessage, message, username } = chat;
  const messageStyle = classnames('chat-message', { 'system': isSystemMessage });
  return (
    <div styleName="chat">
        <span styleName="username">
          {username}:
        </span>
        <div styleName={messageStyle}>
          {message}
        </div>
    </div>
  );
};

ChatMessage.propTypes = {
  chat: shape({
    isSystemMessage: bool.isRequired,
    message: string.isRequired,
    username: string.isRequired
  }).isRequired
};

export default ChatMessage;
