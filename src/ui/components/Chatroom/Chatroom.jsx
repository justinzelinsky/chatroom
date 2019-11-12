import './styles.scss';

import { Container, Jumbotron, Row, Col } from 'react-bootstrap';
import { array, object, string } from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import ChatInput from 'components/ChatInput';
import ChatMessage from 'components/ChatMessage';
import mapDispatchToProps from 'state/mapDispatchToProps';
import { getCurrentUserName } from 'state/selectors';
import {
  subscribeToChatEvents,
  subscribeToUserEvents,
  subscribeToAdminChatEvents,
  closeSocket
} from 'utils/socket';

const Chatroom = ({ activeUsers, actions, chats, username }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    subscribeToChatEvents(chat => {
      const { username, message, ts } = chat;
      actions.addChat(message, ts, username, false);
    });
    subscribeToAdminChatEvents(chat => {
      const { username, message, ts } = chat;
      actions.addAdminChat(message, ts, username);
    });
    subscribeToUserEvents(usernames => actions.updateActiveUsers(usernames));

    return () => closeSocket();
  }, [username]);

  useEffect(() => {
    chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  return (
    <Container fluid={true} styleName="chatroom">
      <Row noGutters={true}>
        <Col md={2} className="d-none d-sm-block">
          <div styleName="users-in-chat-label">Users in the chat:</div>
          {activeUsers.map((user, idx) => (
            <div styleName="user-in-chat" key={idx}>
              {user}
            </div>
          ))}
        </Col>
        <Col>
          <Jumbotron fluid={true} styleName="chats">
            <Container fluid={true}>
              {chats.length === 0 && <div styleName="no-chats">No Chats!</div>}
              {chats.map((chat, idx) => (
                <ChatMessage chat={chat} key={idx} />
              ))}
              <div styleName="chat-end" ref={chatEndRef} />
            </Container>
          </Jumbotron>
        </Col>
      </Row>
      <Row noGutters={true}>
        <ChatInput />
      </Row>
    </Container>
  );
};

Chatroom.propTypes = {
  activeUsers: array.isRequired,
  actions: object.isRequired,
  chats: array.isRequired,
  username: string.isRequired
};

const mapStateToProps = state => ({
  activeUsers: state.activeUsers,
  chats: state.chats,
  username: getCurrentUserName(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
