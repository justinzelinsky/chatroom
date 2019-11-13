import './styles.scss';

import classnames from 'classnames';
import { bool, shape, string, number } from 'prop-types';
import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ChatMessage = ({ chat, index }) => {
  const chatStyleName = classnames('chat-message', {
    'admin-message': chat.isAdminMessage
  });

  return (
    <ListGroup.Item styleName="chat" variant={index % 2 ? 'light' : 'dark'}>
      <div styleName="timestamp">{chat.ts}</div>
      <div styleName="username">{chat.username}</div>
      <div styleName={chatStyleName}>{chat.message}</div>
    </ListGroup.Item>
  );
};

ChatMessage.propTypes = {
  index: number.isRequired,
  chat: shape({
    isAdminMessage: bool.isRequired,
    message: string.isRequired,
    ts: string.isRequired,
    username: string.isRequired
  }).isRequired
};

export default ChatMessage;
