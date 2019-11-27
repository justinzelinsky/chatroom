import './style.scss';

import classnames from 'classnames';
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
  const [timeoutId, setTimeoutId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState('');

  const onChange = event => setMessage(event.target.value);

  const sendMessage = () => {
    if (message) {
      const ts = new Date().valueOf();
      dispatch(actions.addChat({ message, ts, user: currentUser }));
      setMessage('');
    }
  };

  const onKeyDown = event => {
    clearTimeout(timeoutId);

    if (event.key === 'Enter') {
      sendMessage();
      setIsTyping(false);
      dispatch(actions.userStopsTyping());
    } else {
      if (!isTyping) {
        setIsTyping(true);
        dispatch(actions.userStartsTyping());
      }
      setTimeoutId(
        setTimeout(() => {
          setIsTyping(false);
          dispatch(actions.userStopsTyping());
        }, 500)
      );
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
    <Form
      autoComplete="off"
      onSubmit={handleOnSubmit}
      styleName={chatInputClassname}>
      <Form.Group controlId="message" styleName="chat-input-group">
        <Form.Label styleName="username-display">{currentUser.name}</Form.Label>
        <Form.Control
          autoFocus={true}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Type your message..."
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
