import './style.scss';

import classnames from 'classnames';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import actions from 'state/actions';

const ChatInput = () => {
  const { currentUser, darkMode } = useSelector(state => ({
    currentUser: state.currentUser,
    darkMode: state.darkMode
  }));
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');

  const onChange = event => setMessage(event.target.value);

  const sendMessage = () => {
    if (message) {
      const ts = dayjs().valueOf();
      dispatch(actions.addChat({ message, ts, user: currentUser }));
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

export default ChatInput;
