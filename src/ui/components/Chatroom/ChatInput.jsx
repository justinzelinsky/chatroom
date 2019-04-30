import './ChatInput.scss';

import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { object, string } from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import mapDispatchToProps from 'state/mapDispatchToProps';
import { getCurrentUserName } from 'state/selectors';
import { emitNewChat } from 'utils/Socket';

const ChatInput = ({ actions, username }) => {
  const [message, setMessage] = useState('');

  const onChange = event => setMessage(event.target.value);

  const sendMessage = () => {
    if (message) {
      const ts = moment().format('HH:mm');
      actions.addChat(message, ts, username);
      emitNewChat({ message, ts, username });
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

  const handleLogout = () => {
    console.log('logout');
    actions.logout();
  };

  return (
    <Container fluid={true} styleName="chat-input-container">
      <Row>
        <Col>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group as={Row} controlId="message">
              <Form.Label styleName="username-display" column={true}>
                {username}
                <a onClick={handleLogout} styleName="logout-link">
                  (logout)
                </a>
              </Form.Label>
              <Col xs={9}>
                <Form.Control
                  autoFocus={true}
                  onChange={onChange}
                  onKeyPress={onKeyPress}
                  type="text"
                  value={message}
                />
              </Col>
              <Col>
                <Button
                  variant="primary"
                  onClick={handleSendClick}
                  block={true}>
                  Send
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

ChatInput.propTypes = {
  actions: object.isRequired,
  username: string.isRequired
};

const mapStateToProps = state => ({
  username: getCurrentUserName(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatInput);
