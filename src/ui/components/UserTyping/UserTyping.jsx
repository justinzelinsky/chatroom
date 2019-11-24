import './style.scss';

import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const UserTyping = () => {
  const usersTyping = useSelector(state => state.usersTyping);
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const dotProgress = dots.length < 3 ? `${dots}.` : '.';
    setTimeout(() => setDots(dotProgress), 500);
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
  return (
    <ListGroup.Item styleName="user-typing-chat" variant="primary">
      {someoneIsTyping}
    </ListGroup.Item>
  );
};

export default UserTyping;
