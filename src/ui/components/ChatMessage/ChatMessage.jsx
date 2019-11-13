import './style.scss';

import classnames from 'classnames';
import { bool, shape, string, number } from 'prop-types';
import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ChatMessage = ({ chat, darkMode, index, noChats }) => {
  const chatStyleName = classnames('chat-message', {
    'admin-message': chat && chat.isAdminMessage
  });

  let chatVariant;

  if (darkMode) {
    chatVariant = index % 2 ? 'primary' : 'info';
  } else {
    chatVariant = index % 2 ? 'light' : 'dark';
  }

  if (noChats) {
    return (
      <ListGroup.Item styleName="chat" variant={chatVariant}>
        No chats!
      </ListGroup.Item>
    );
  }

  return (
    <ListGroup.Item styleName="chat" variant={chatVariant}>
      <div styleName="timestamp">{chat.ts}</div>
      <div styleName="username">{chat.username}</div>
      <div styleName={chatStyleName}>{chat.message}</div>
    </ListGroup.Item>
  );
};

ChatMessage.propTypes = {
  chat: shape({
    isAdminMessage: bool.isRequired,
    message: string.isRequired,
    ts: string.isRequired,
    username: string.isRequired
  }),
  darkMode: bool.isRequired,
  index: number,
  noChats: bool.isRequired
};

ChatMessage.defaultProps = {
  noChats: false
};

export default ChatMessage;
