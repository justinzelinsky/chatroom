import './Login.scss';

import {
  Button,
  ButtonToolbar,
  Container,
  Form,
  Row,
  Col
} from 'react-bootstrap';
import { object, string } from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import mapDispatchToProps from 'state/mapDispatchToProps';
import { getEmailError, getPasswordError } from 'state/selectors';

const Login = ({ actions, emailError, passwordError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const disableButton = !email || !password;

  const onEmailChange = event => setEmail(event.target.value);
  const onPasswordChange = event => setPassword(event.target.value);
  const handleOnSubmit = event => {
    event.preventDefault();

    if (!disableButton) {
      actions.login(email, password);
    }
  };

  return (
    <Container styleName="login-container">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1 styleName="login-header">Login</h1>
          <Form styleName="login-form" onSubmit={handleOnSubmit}>
            <Form.Group as={Row} controlId="email">
              <Form.Label column={true} sm={3}>
                Email address
              </Form.Label>
              <Col sm={9}>
                <Form.Control onChange={onEmailChange} type="email" />
                {emailError && (
                  <Form.Text className="text-muted">{emailError}</Form.Text>
                )}
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="password">
              <Form.Label column={true} sm={3}>
                Password
              </Form.Label>
              <Col sm={9}>
                <Form.Control onChange={onPasswordChange} type="password" />
                {passwordError && (
                  <Form.Text className="text-muted">{passwordError}</Form.Text>
                )}
              </Col>
            </Form.Group>
            <ButtonToolbar>
              <Button disabled={disableButton} variant="primary" type="submit">
                Login
              </Button>
              <Link to="register" className="btn btn-link">
                Register
              </Link>
            </ButtonToolbar>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

Login.propTypes = {
  actions: object.isRequired,
  emailError: string,
  passwordError: string
};

const mapStateToProps = state => ({
  emailError: getEmailError(state),
  passwordError: getPasswordError(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
