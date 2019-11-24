import './style.scss';

import { number } from 'prop-types';
import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const UserTyping = ({ index }) => {
  const { darkMode, usersTyping } = useSelector(state => ({
    darkMode: state.darkMode,
    usersTyping: state.usersTyping
  }));
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const dotProgress = dots.length < 3 ? `${dots}.` : '.';
    const timeoutId = setTimeout(() => setDots(dotProgress), 500);
    return () => clearTimeout(timeoutId);
  }, [dots]);

  if (usersTyping.length === 0) {
    return (
      <ListGroup.Item styleName="user-typing-chat hidden" variant="primary" />
    );
  }

  const someoneIsTyping =
    usersTyping.length === 1
      ? `${usersTyping[0].name} is typing ${dots}`
      : `Multiple people are typing ${dots}`;

  let chatVariant;

  if (darkMode) {
    chatVariant = index % 2 ? 'primary' : 'info';
  } else {
    chatVariant = index % 2 ? 'light' : 'dark';
  }
  return (
    <ListGroup.Item styleName="user-typing-chat" variant={chatVariant}>
      {someoneIsTyping}
    </ListGroup.Item>
  );
};

UserTyping.propTypes = {
  index: number.isRequired
};

export default UserTyping;
