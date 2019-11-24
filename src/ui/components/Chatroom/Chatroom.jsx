import './style.scss';

import classnames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import UserList from 'components/UserList';
import ChatInput from 'components/ChatInput';
import ChatMessage from 'components/ChatMessage';
import UserTyping from 'components/UserTyping';
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
        <ListGroup styleName={chatsClassname}>
          {chats.length === 0 && <ChatMessage noChats={true} />}
          {chats.map((chat, idx) => (
            <ChatMessage chat={chat} index={idx} key={idx} />
          ))}
          <UserTyping />
          <ListGroup.Item ref={chatEndRef} styleName="chat-end" />
        </ListGroup>
        <UserList />
      </div>
      <ChatInput />
    </Container>
  );
};

export default Chatroom;
