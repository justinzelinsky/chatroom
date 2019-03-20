import './ChatMessage.scss';

import classnames from 'classnames';
import { object } from 'prop-types';
import React from 'react';
import {
  Row,
  Col
} from 'react-bootstrap';

const ChatMessage = ({ chat }) => {
  const { isSystemMessage, message, username } = chat;
  const messageStyle = classnames({ 'system': isSystemMessage });
  const displayUsername = isSystemMessage ? 'Admin' : username;
  return (
    <Row>
      <Col xs={3}>
        <span styleName="username">
          {displayUsername}:
        </span>
      </Col>
      <Col>
        <div styleName={messageStyle}>
          {message}
        </div>
      </Col>
    </Row>
  );
};

ChatMessage.propTypes = {
  chat: object.isRequired
};

export default ChatMessage;
