import { hasErrors, setCurrentUser } from 'state/actions';
import {
  currentUser,
  currentUserInitialState,
  errors,
  errorsInitialState
} from 'state/reducers';
import {
  getCurrentUserName,
  getEmailError,
  getPasswordError,
  getPassword2Error,
  getNameError
} from 'state/selectors';

describe('Current Username Selector', () => {
  it('should properly get the username of the current user logged in', () => {
    const currentUserObj = {
      id: '123',
      name: 'Justin',
      iat: 456,
      exp: 789
    };
    const action = setCurrentUser(currentUserObj);
    const state = {
      currentUser: currentUser(currentUserInitialState, action)
    };
    const currentUsername = getCurrentUserName(state);
    expect(currentUsername).toEqual(currentUserObj.name);
  });
});

describe('Error Selectors', () => {
  it('should get the correct email error', () => {
    const errorState = errors(errorsInitialState, {});

    const error = { email: 'Email error' };
    const action = hasErrors(error);
    const state = {
      errors: errors(errorState, action)
    };
    const emailError = getEmailError(state);
    expect(emailError).toEqual(error.email);
  });

  it('should get the correct password error', () => {
    const errorState = errors(errorsInitialState, {});

    const error = { password: 'Password Error' };
    const action = hasErrors(error);
    const state = {
      errors: errors(errorState, action)
    };
    const passwordError = getPasswordError(state);
    expect(passwordError).toEqual(error.password);
  });

  it('should get the correct password 2 error', () => {
    const errorState = errors(errorsInitialState, {});

    const error = { password2: 'Password 2 Error' };
    const action = hasErrors(error);
    const state = {
      errors: errors(errorState, action)
    };
    const password2Error = getPassword2Error(state);
    expect(password2Error).toEqual(error.password2);
  });

  it('should get the correct name error', () => {
    const errorState = errors(errorsInitialState, {});

    const error = { name: 'Name error' };
    const action = hasErrors(error);
    const state = {
      errors: errors(errorState, action)
    };
    const nameError = getNameError(state);
    expect(nameError).toEqual(error.name);
  });

  it('should not grab the incorrect error given multiple errors available', () => {
    const errorState = errors(errorsInitialState, {});

    const error = { name: 'Name error' };
    const action = hasErrors(error);
    const state = {
      errors: errors(errorState, action)
    };
    console.log(state);
    const error2 = { email: 'Email error' };
    const action2 = hasErrors(error2);
    const state2 = {
      errors: errors(state.errors, action2)
    };
    console.log(state2);
    const nameError = getNameError(state2);
    expect(nameError).toEqual(error.name);
  });
});
