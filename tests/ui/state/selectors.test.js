import {
  hasErrors,
  setCurrentUser,
  updateActiveUsers
} from '../../../src/ui/state/actions';
import {
  activeUsers,
  currentUser,
  errors,
  errorsInitialState,
  currentUserInitialState
} from '../../../src/ui/state/reducers';
import {
  getActiveUserList,
  getEmailError,
  getPasswordError,
  getPassword2Error,
  getNameError,
  getIsAuthenticated,
  getIsAdmin
} from '../../../src/ui/state/selectors';

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

    const error2 = { email: 'Email error' };
    const action2 = hasErrors(error2);
    const state2 = {
      errors: errors(state.errors, action2)
    };
    const nameError = getNameError(state2);

    expect(nameError).toEqual(error.name);
  });
});

const loggedInUser = {
  admin: true,
  id: 1,
  name: 'Justin'
};

const otherUsers = [
  {
    admin: false,
    id: 2,
    name: 'Alex'
  },
  {
    admin: false,
    id: 3,
    name: 'Gene'
  }
];

describe('getActiveUserList selector', () => {
  it('should return the list of active users with the currently logged in user first', () => {
    const state = {
      currentUser: currentUser({}, setCurrentUser(loggedInUser)),
      activeUsers: activeUsers({}, updateActiveUsers(otherUsers))
    };

    const [firstActiveUser, ...otherActiveUsers] = getActiveUserList(state);

    expect(firstActiveUser.name).toEqual(loggedInUser.name);
    expect(firstActiveUser.isSelf).toEqual(true);
    expect(otherActiveUsers).toEqual(otherUsers);
  });
});

describe('getIsAuthenticated selector', () => {
  it('should return false when not logged in', () => {
    const state = {
      currentUser: currentUserInitialState
    };

    const isAuthenticated = getIsAuthenticated(state);
    expect(isAuthenticated).toEqual(false);
  });

  it('should return true when logged in', () => {
    const state = {
      currentUser: currentUser({}, setCurrentUser(loggedInUser))
    };

    const isAuthenticated = getIsAuthenticated(state);
    expect(isAuthenticated).toEqual(true);
  });
});

describe('getIsAdmin selector', () => {
  it('should return false for a non-admin user', () => {
    const state = {
      currentUser: currentUser({}, setCurrentUser(otherUsers[0]))
    };

    const isAdmin = getIsAdmin(state);
    expect(isAdmin).toEqual(false);
  });

  it('should return true for an admin user', () => {
    const state = {
      currentUser: currentUser({}, setCurrentUser(loggedInUser))
    };

    const isAdmin = getIsAdmin(state);
    expect(isAdmin).toEqual(true);
  });
});
