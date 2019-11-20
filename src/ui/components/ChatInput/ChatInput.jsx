import './style.scss';

import classnames from 'classnames';
import dayjs from 'dayjs';
import { object, bool } from 'prop-types';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';

import mapDispatchToProps from 'state/mapDispatchToProps';

const ChatInput = ({ actions, darkMode, currentUser }) => {
  const [message, setMessage] = useState('');

  const onChange = event => setMessage(event.target.value);

  const sendMessage = () => {
    if (message) {
      const ts = dayjs().valueOf();
      actions.addChat({ message, ts, user: currentUser });
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

  const chatInputClassname = classnames('chat-input-container', {
    'dark-mode': darkMode
  });

  return (
    <Form onSubmit={handleOnSubmit} styleName={chatInputClassname}>
      <Form.Group controlId="message" styleName="chat-input-group">
        <Form.Label styleName="username-display">{currentUser.name}</Form.Label>
        <Form.Control
          autoFocus={true}
          onChange={onChange}
          onKeyPress={onKeyPress}
          type="text"
          value={message}
        />
      </Form.Group>
      <Button
        block={true}
        onClick={handleSendClick}
        styleName="send-button"
        variant="primary">
        Send
      </Button>
    </Form>
  );
};

ChatInput.propTypes = {
  actions: object.isRequired,
  currentUser: object.isRequired,
  darkMode: bool.isRequired
};

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  darkMode: state.darkMode
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);
