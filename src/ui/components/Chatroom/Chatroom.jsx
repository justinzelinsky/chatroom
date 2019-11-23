import './style.scss';

import classnames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import ActiveUsers from 'components/ActiveUsers';
import ChatInput from 'components/ChatInput';
import ChatMessage from 'components/ChatMessage';
import useSockets from 'utils/useSockets';

const Chatroom = () => {
  const { chats, darkMode } = useSelector(state => ({
    chats: state.chats,
    darkMode: state.darkMode
  }));
  const chatEndRef = useRef(null);
  const handleClose = useSockets();

  useEffect(() => {
    return handleClose;
  }, []);

  useEffect(() => {
    chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  const chatsClassname = classnames('chats', { 'dark-mode': darkMode });

  return (
    <Container fluid={true} styleName="chatroom">
      <Row noGutters={true}>
        <Col md={1} className="d-none d-sm-block">
          <ActiveUsers />
        </Col>
        <Col>
          <ListGroup styleName={chatsClassname}>
            {chats.length === 0 && (
              <ChatMessage darkMode={darkMode} noChats={true} />
            )}
            {chats.map((chat, idx) => (
              <ChatMessage
                chat={chat}
                darkMode={darkMode}
                index={idx}
                key={idx}
              />
            ))}
            <ListGroup.Item ref={chatEndRef} styleName="chat-end" />
          </ListGroup>
        </Col>
      </Row>
      <Row noGutters={true}>
        <Col>
          <ChatInput />
        </Col>
      </Row>
    </Container>
  );
};

export default Chatroom;
