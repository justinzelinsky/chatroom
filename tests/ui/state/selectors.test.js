import { hasErrors, setCurrentUser } from '../../../src/ui/state/actions';
import {
  currentUser,
  errors,
  errorsInitialState,
  currentUserInitialState
} from '../../../src/ui/state/reducers';
import {
  getEmailError,
  getIsAuthenticated,
  getIsAdmin,
  getPasswordError,
  getPasswordConfirmationError,
  getNameError,
  getUserList
} from '../../../src/ui/state/selectors';

describe('getUserList selector', () => {
  it('should return the appropriate list of users with their active state', () => {
    const state = {
      activeUsers: [
        {
          id: 0,
          name: 'Justin'
        }
      ],
      allUsers: [
        {
          id: 0,
          name: 'Justin'
        },
        {
          id: 1,
          name: 'Alex'
        }
      ],
      currentUser: {
        id: 0,
        name: 'Justin'
      }
    };

    const userList = getUserList(state);
    expect(userList).toHaveLength(2);
    expect(userList.find(user => user.name === 'Justin').isSelf).toEqual(true);
    expect(userList.find(user => user.name === 'Alex').isActive).toEqual(false);
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

  it('should get the correct password confirmation error', () => {
    const errorState = errors(errorsInitialState, {});

    const error = { passwordConfirmation: 'Password Confirmation Error' };
    const action = hasErrors(error);
    const state = {
      errors: errors(errorState, action)
    };
    const passwordConfirmationError = getPasswordConfirmationError(state);

    expect(passwordConfirmationError).toEqual(error.passwordConfirmation);
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
