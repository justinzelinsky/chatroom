import './styles.scss';

import dayjs from 'dayjs';
import { object, string } from 'prop-types';
import React, { useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import LogoutButton from 'components/LogoutButton';
import mapDispatchToProps from 'state/mapDispatchToProps';
import { getCurrentUserName } from 'state/selectors';

const ChatInput = ({ actions, username }) => {
  const [message, setMessage] = useState('');

  const onChange = event => setMessage(event.target.value);

  const sendMessage = () => {
    if (message) {
      const ts = dayjs().format('HH:mm');
      actions.addChat(message, ts, username);
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

  return (
    <Container fluid={true} styleName="chat-input-container">
      <Row noGutters={true}>
        <Col>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group as={Row} controlId="message">
              <Form.Label column={true} styleName="username-display" sm={2}>
                {username}
                <LogoutButton />
              </Form.Label>
              <Col>
                <Form.Control
                  autoFocus={true}
                  onChange={onChange}
                  onKeyPress={onKeyPress}
                  type="text"
                  value={message}
                />
              </Col>
              <Col sm={2}>
                <Button
                  styleName="send-button"
                  variant="primary"
                  onClick={handleSendClick}
                  block={true}
                >
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);
