import './Login.scss';

import {
  object,
  string
} from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import mapDispatchToProps from 'state/mapDispatchToProps';
import {
  getEmailError,
  getPasswordError
} from 'state/selectors';

const Login = ({ actions, emailError, passwordError }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const disableButton = !email || !password;

  const handleLogin = () => actions.login(email, password);
  const onEmailChange = event => setEmail(event.target.value);
  const onPasswordChange = event => setPassword(event.target.value);
  const handleOnSubmit = event => {
    event.preventDefault();

    if (!disableButton) {
      handleLogin();
    }
  };

  return  (
    <form onSubmit={handleOnSubmit}
          styleName="login">
      <h1 styleName="login-header">Login</h1>
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
      <button disabled={disableButton}
              onClick={handleLogin}
              styleName="login-button">
        Login
      </button>
      <Link styleName="action-link"
            to="register">
        Register
      </Link>
    </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
