import './style.scss';

import dayjs from 'dayjs';
import classnames from 'classnames';
import { bool, shape, string, number, object } from 'prop-types';
import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ChatMessage = ({ chat, index }) => {
  const darkMode = useSelector(state => state.darkMode);

  let chatVariant;

  if (darkMode) {
    chatVariant = index % 2 ? 'primary' : 'info';
  } else {
    chatVariant = index % 2 ? 'light' : 'dark';
  }

  const { isAdminMessage, message, ts, user } = chat;

  const chatStyleName = classnames('chat-message', {
    'admin-message': isAdminMessage
  });

  const timestamp = dayjs(ts).format('HH:mm');

  return (
    <ListGroup.Item styleName="chat" variant={chatVariant}>
      <div styleName="username-chat">
        <div styleName="username">{user.name}</div>
        <div styleName={chatStyleName}>{message}</div>
      </div>
      <div styleName="timestamp">{timestamp}</div>
    </ListGroup.Item>
  );
};

ChatMessage.propTypes = {
  chat: shape({
    isAdminMessage: bool,
    message: string,
    ts: number,
    user: object
  }).isRequired,
  index: number
};

ChatMessage.defaultProps = {
  chat: {}
};

export default ChatMessage;
