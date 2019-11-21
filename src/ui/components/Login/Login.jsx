import './style.scss';

import classnames from 'classnames';
import {
  Button,
  ButtonToolbar,
  Col,
  Form,
  Jumbotron,
  Row
} from 'react-bootstrap';
import { object, string, bool } from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import mapDispatchToProps from 'state/mapDispatchToProps';
import { getEmailError, getPasswordError } from 'state/selectors';

const Login = ({ actions, darkMode, emailError, passwordError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const disableButton = !email || !password;

  const onEmailChange = event => setEmail(event.target.value);
  const onPasswordChange = event => setPassword(event.target.value);
  const handleOnSubmit = event => {
    event.preventDefault();

    if (!disableButton) {
      actions.login({ email, password });
    }
  };

  const loginClassame = classnames('login-container', {
    'dark-mode': darkMode
  });

  return (
    <Jumbotron styleName={loginClassame}>
      <h1 styleName="login-header">Login</h1>
      <Form
        autoComplete={'off'}
        styleName="login-form"
        onSubmit={handleOnSubmit}>
        <Form.Group as={Row} controlId="email">
          <Form.Label column={true} sm={3}>
            Email address
          </Form.Label>
          <Col sm={9}>
            <Form.Control autoFocus={true} onChange={onEmailChange} type="email" />
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
          <Button disabled={disableButton} type="submit" variant="primary">
            Login
          </Button>
          <Link className="btn btn-link" to="register">
            Register
          </Link>
        </ButtonToolbar>
      </Form>
    </Jumbotron>
  );
};

Login.propTypes = {
  actions: object.isRequired,
  darkMode: bool.isRequired,
  emailError: string,
  passwordError: string
};

const mapStateToProps = state => ({
  darkMode: state.darkMode,
  emailError: getEmailError(state),
  passwordError: getPasswordError(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
