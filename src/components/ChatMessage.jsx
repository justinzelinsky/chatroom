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
  const displayUsername = isSystemMessage ? 'Admin' : username;
  return (
    <div styleName="chat">
        <span styleName="username">
          {displayUsername}:
        </span>
        <div styleName={messageStyle}>
          {message}
        </div>
    </div>
  );
};

ChatMessage.propTypes = {
  chat: shape({
    isSystemMessage: bool,
    message: string.isRequired,
    username: string.isRequired
  }).isRequired
};

export default ChatMessage;
