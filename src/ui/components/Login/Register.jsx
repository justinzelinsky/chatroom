import './Login.scss';

import {
  string,
  object
} from 'prop-types';
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
  emailError,
  nameError,
  passwordError,
  password2Error
}) => {
  const [ email, setEmail ] = useState('');
  const [ name, setName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ password2, setPassword2 ] = useState('');
  const disableButton = !email || !name || !password || !password2 || password !== password2;

  const onNameChange = event => setName(event.target.value);
  const onEmailChange = event => setEmail(event.target.value);
  const onPasswordChange = event => setPassword(event.target.value);
  const onPassword2Change = event => setPassword2(event.target.value);
  const handleOnSubmit = event => {
    event.preventDefault();

    if (!disableButton) {
      actions.register(name, email, password, password2);
    }
  };
  return (
    <div styleName="login-container">
      <h1 styleName="login-header">
        Register
      </h1>
      <form onSubmit={handleOnSubmit}
            styleName="login-form">
        <div styleName="login-input">
          <label htmlFor="name">
            Name:
            {nameError && (
              <div styleName="input-error">
                {nameError}
              </div>
            )}
          </label>
          <input id="name"
                 onChange={onNameChange} />
        </div>
        <div styleName="login-input">
          <label htmlFor="email">
            Email:
            {emailError && (
              <div styleName="input-error">
                {emailError}
              </div>
            )}
          </label>
          <input id="email"
                 onChange={onEmailChange} />
        </div>
        <div styleName="login-input">
          <label htmlFor="password">
            Password:
            {passwordError && (
              <div styleName="input-error">
                {passwordError}
              </div>
            )}
          </label>
          <input id="password"
                 onChange={onPasswordChange}
                 type="password" />
        </div>
        <div styleName="login-input">
          <label htmlFor="password-again">
            Password (again):
            {password2Error && (
              <div styleName="input-error">
                {password2Error}
              </div>
            )}
          </label>
          <input id="password-again"
                 onChange={onPassword2Change}
                 type="password" />
        </div>
        <div styleName="login-buttons">
          <button disabled={disableButton}
                  styleName="login-button">
            Register
          </button>
          <Link styleName="action-link"
                to="login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

Register.propTypes = {
  actions: object.isRequired,
  emailError: string,
  nameError: string,
  passwordError: string,
  password2Error: string
};

const mapStateToProps = state => ({
  emailError: getEmailError(state),
  nameError: getNameError(state),
  passwordError: getPasswordError(state),
  password2Error: getPassword2Error(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);