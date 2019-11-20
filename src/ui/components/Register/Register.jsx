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
import { bool, object, string } from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import mapDispatchToProps from 'state/mapDispatchToProps';
import {
  getEmailError,
  getNameError,
  getPasswordError,
  getPassword2Error
} from 'state/selectors';

const Register = ({
  actions,
  darkMode,
  emailError,
  nameError,
  passwordError,
  password2Error
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const disableButton =
    !email || !name || !password || !password2 || password !== password2;

  const onNameChange = event => setName(event.target.value);
  const onEmailChange = event => setEmail(event.target.value);
  const onPasswordChange = event => setPassword(event.target.value);
  const onPassword2Change = event => setPassword2(event.target.value);
  const handleOnSubmit = event => {
    event.preventDefault();

    if (!disableButton) {
      actions.register({ name, email, password, password2 });
    }
  };

  const registerClassname = classnames('login-container', {
    'dark-mode': darkMode
  });

  return (
    <Jumbotron styleName={registerClassname}>
      <h1 styleName="login-header">Register</h1>
      <Form
        autoComplete={'off'}
        styleName="login-form"
        onSubmit={handleOnSubmit}>
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

        <Form.Group as={Row} controlId="password2">
          <Form.Label column={true} xs={4}>
            Password (again)
          </Form.Label>
          <Col xs={8}>
            <Form.Control onChange={onPassword2Change} type="password" />
            {password2Error && (
              <Form.Text className="text-muted">{password2Error}</Form.Text>
            )}
          </Col>
        </Form.Group>

        <ButtonToolbar>
          <Button disabled={disableButton} variant="primary" type="submit">
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
  password2Error: string
};

const mapStateToProps = state => ({
  darkMode: state.darkMode,
  emailError: getEmailError(state),
  nameError: getNameError(state),
  passwordError: getPasswordError(state),
  password2Error: getPassword2Error(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
