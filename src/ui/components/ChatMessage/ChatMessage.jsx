import './style.scss';

import dayjs from 'dayjs';
import classnames from 'classnames';
import { bool, shape, string, number, object } from 'prop-types';
import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ChatMessage = ({ chat = {}, darkMode, index, noChats }) => {
  const { isAdminMessage, message, ts, user } = chat;

  const chatStyleName = classnames('chat-message', {
    'admin-message': isAdminMessage
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

  const timestamp = dayjs(ts).format('hh:mm');

  return (
    <ListGroup.Item styleName="chat" variant={chatVariant}>
      <div styleName="timestamp">{timestamp}</div>
      <div styleName="username">{user.name}</div>
      <div styleName={chatStyleName}>{message}</div>
    </ListGroup.Item>
  );
};

ChatMessage.propTypes = {
  chat: shape({
    isAdminMessage: bool.isRequired,
    message: string.isRequired,
    ts: number.isRequired,
    user: object.isRequired
  }),
  darkMode: bool.isRequired,
  index: number,
  noChats: bool.isRequired
};

ChatMessage.defaultProps = {
  noChats: false
};

export default ChatMessage;
