import './style.scss';

import classnames from 'classnames';
import { bool, object, string } from 'prop-types';
import React, { useState } from 'react';
import {
  Button,
  ButtonToolbar,
  Col,
  Form,
  Jumbotron,
  Row
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import mapDispatchToProps from 'state/mapDispatchToProps';
import {
  getEmailError,
  getNameError,
  getPasswordError,
  getPasswordConfirmationError
} from 'state/selectors';

const Register = ({
  actions,
  darkMode,
  emailError,
  nameError,
  passwordError,
  passwordConfirmationError
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const disableButton =
    !email ||
    !name ||
    !password ||
    !passwordConfirmation ||
    password !== passwordConfirmation;

  const onNameChange = event => setName(event.target.value);
  const onEmailChange = event => setEmail(event.target.value);
  const onPasswordChange = event => setPassword(event.target.value);
  const onPasswordConfirmationChange = event =>
    setPasswordConfirmation(event.target.value);
  const handleOnSubmit = event => {
    event.preventDefault();

    if (!disableButton) {
      actions.register({ name, email, password, passwordConfirmation });
    }
  };

  const registerClassname = classnames('register-container', {
    'dark-mode': darkMode
  });

  return (
    <Jumbotron styleName={registerClassname}>
      <h1 styleName="register-header">Register</h1>
      <Form
        autoComplete="off"
        onSubmit={handleOnSubmit}
        styleName="register-form">
        <Form.Group as={Row} controlId="name">
          <Form.Label column={true} xs={4}>
            Name
          </Form.Label>
          <Col xs={8}>
            <Form.Control onChange={onNameChange} />
            {nameError && (
              <Form.Text className="text-muted">{nameError}</Form.Text>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="email">
          <Form.Label column={true} xs={4}>
            Email address
          </Form.Label>
          <Col xs={8}>
            <Form.Control onChange={onEmailChange} type="email" />
            {emailError && (
              <Form.Text className="text-muted">{emailError}</Form.Text>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="password">
          <Form.Label column={true} xs={4}>
            Password
          </Form.Label>
          <Col xs={8}>
            <Form.Control onChange={onPasswordChange} type="password" />
            {passwordError && (
              <Form.Text className="text-muted">{passwordError}</Form.Text>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="passwordConfirmation">
          <Form.Label column={true} xs={4}>
            Password (again)
          </Form.Label>
          <Col xs={8}>
            <Form.Control
              onChange={onPasswordConfirmationChange}
              type="password"
            />
            {passwordConfirmationError && (
              <Form.Text className="text-muted">
                {passwordConfirmationError}
              </Form.Text>
            )}
          </Col>
        </Form.Group>

        <ButtonToolbar>
          <Button disabled={disableButton} type="submit" variant="primary">
            Register
          </Button>
          <Link to="login" className="btn btn-link">
            Login
          </Link>
        </ButtonToolbar>
      </Form>
    </Jumbotron>
  );
};

Register.propTypes = {
  actions: object.isRequired,
  darkMode: bool.isRequired,
  emailError: string,
  nameError: string,
  passwordError: string,
  passwordConfirmationError: string
};

const mapStateToProps = state => ({
  darkMode: state.darkMode,
  emailError: getEmailError(state),
  nameError: getNameError(state),
  passwordError: getPasswordError(state),
  passwordConfirmationError: getPasswordConfirmationError(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
