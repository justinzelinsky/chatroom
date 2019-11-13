import './styles.scss';

import dayjs from 'dayjs';
import { object, string } from 'prop-types';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';

import mapDispatchToProps from 'state/mapDispatchToProps';
import { getCurrentUserName } from 'state/selectors';

const ChatInput = ({ actions, username }) => {
  const [message, setMessage] = useState('');

  const onChange = event => setMessage(event.target.value);

  const sendMessage = () => {
    if (message) {
      const ts = dayjs().format('HH:mm');
      actions.addChat(message, ts, username);
      setMessage('');
    }
  };

  const onKeyPress = event => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const handleOnSubmit = event => {
    event.preventDefault();
    sendMessage();
  };

  const handleSendClick = () => sendMessage();

  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Group controlId="message" styleName="chat-input-container">
        <Form.Label styleName="username-display">{username}</Form.Label>
        <Form.Control
          autoFocus={true}
          onChange={onChange}
          onKeyPress={onKeyPress}
          type="text"
          value={message}
        />
        <Button
          styleName="send-button"
          variant="primary"
          onClick={handleSendClick}
          block={true}>
          Send
        </Button>
      </Form.Group>
    </Form>
  );
};

ChatInput.propTypes = {
  actions: object.isRequired,
  username: string.isRequired
};

const mapStateToProps = state => ({
  username: getCurrentUserName(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);
