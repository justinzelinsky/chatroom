import './styles.scss';

import { array } from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import ActiveUsers from 'components/ActiveUsers';
import ChatInput from 'components/ChatInput';
import ChatMessage from 'components/ChatMessage';
import mapDispatchToProps from 'state/mapDispatchToProps';
import useSockets from 'utils/useSockets';

const Chatroom = ({ activeUsers, chats }) => {
  const chatEndRef = useRef(null);
  const handleClose = useSockets();

  useEffect(() => {
    return handleClose;
  }, []);

  useEffect(() => {
    chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  return (
    <Container fluid={true} styleName="chatroom">
      <Row noGutters={true}>
        <Col md={2} className="d-none d-sm-block">
          <ActiveUsers activeUsers={activeUsers} />
        </Col>
        <Col>
          <Container fluid={true} styleName="chats">
            {chats.length === 0 && <div styleName="no-chats">No Chats!</div>}
            <ListGroup>
              {chats.map((chat, idx) => (
                <ChatMessage chat={chat} index={idx} key={idx} />
              ))}
            </ListGroup>
            <div styleName="chat-end" ref={chatEndRef} />
          </Container>
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

Chatroom.propTypes = {
  activeUsers: array.isRequired,
  chats: array.isRequired
};

const mapStateToProps = state => ({
  activeUsers: state.activeUsers,
  chats: state.chats
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
