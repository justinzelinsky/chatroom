import './style.scss';

import classnames from 'classnames';
import dayjs from 'dayjs';
import { object, string, bool } from 'prop-types';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';

import mapDispatchToProps from 'state/mapDispatchToProps';
import { getCurrentUserName } from 'state/selectors';

const ChatInput = ({ actions, darkMode, username }) => {
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

  const buttonVariant = darkMode ? 'dark' : 'light';

  const chatInputClassname = classnames('chat-input-container', {
    'dark-mode': darkMode
  });

  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Group controlId="message" styleName={chatInputClassname}>
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
          variant={buttonVariant}
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
  darkMode: bool.isRequired,
  username: string.isRequired
};

const mapStateToProps = state => ({
  darkMode: state.darkMode,
  username: getCurrentUserName(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);
