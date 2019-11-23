import './style.scss';

import classnames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import UserList from 'components/UserList';
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
      <div styleName="chatroom-userlist-container">
        <UserList />
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
      </div>
      <ChatInput />
    </Container>
  );
};

export default Chatroom;
