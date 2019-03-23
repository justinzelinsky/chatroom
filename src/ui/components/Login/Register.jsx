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

  const handleRegister = () => actions.register(name, email, password, password2);
  const onNameChange = event => setName(event.target.value);
  const onEmailChange = event => setEmail(event.target.value);
  const onPasswordChange = event => setPassword(event.target.value);
  const onPassword2Change = event => setPassword2(event.target.value);
  const handleOnSubmit = event => {
    event.preventDefault();

    if (!disableButton) {
      handleRegister();
    }
  };
  return (
    <form onSubmit={handleOnSubmit}
          styleName="login">
      <h1 styleName="login-header">Register</h1>
      <div styleName="login-input">
        <label>
          Name:
          {nameError && (
            <div styleName="input-error">
              {nameError}
            </div>
          )}
        </label>
        <input onChange={onNameChange} />
      </div>
      <div styleName="login-input">
        <label>
          Email:
          {emailError && (
            <div styleName="input-error">
              {emailError}
            </div>
          )}
        </label>
        <input onChange={onEmailChange} />
      </div>
      <div styleName="login-input">
        <label>
          Password:
          {passwordError && (
            <div styleName="input-error">
              {passwordError}
            </div>
          )}
        </label>
        <input onChange={onPasswordChange}
               type="password" />
      </div>
      <div styleName="login-input">
        <label>
          Password (again):
          {password2Error && (
            <div styleName="input-error">
              {password2Error}
            </div>
          )}
        </label>
        <input onChange={onPassword2Change}
               type="password" />
      </div>
      <button disabled={disableButton}
              onClick={handleRegister}
              styleName="login-button">
        Register
      </button>
      <Link styleName="action-link"
            to="login">
        Login
      </Link>
    </form>
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