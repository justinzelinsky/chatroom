import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const NoMessages = () => {
  const darkMode = useSelector(state => state.darkMode);

  const chatVariant = darkMode ? 'primary' : 'light';

  return <ListGroup.Item variant={chatVariant}>No messages!</ListGroup.Item>;
};

export default NoMessages;
