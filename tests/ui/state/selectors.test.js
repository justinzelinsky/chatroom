import { hasErrors, setCurrentUser } from 'ui/state/actions';
import {
  currentUser,
  errors,
  errorsInitialState,
  currentUserInitialState
} from 'ui/state/reducers';
import {
  getEmailError,
  getIsAuthenticated,
  getIsAdmin,
  getPasswordError,
  getPasswordConfirmationError,
  getNameError,
  getUserList
} from 'ui/state/selectors';

describe('getUserList selector', () => {
  const allUsers = [
    {
      id: 0,
      name: 'Justin'
    },
    {
      id: 1,
      name: 'Alex'
    }
  ];

  it('should return an empty list at start', () => {
    const state = {
      activeUsers: [],
      allUsers,
      currentUser: null
    };
    const userList = getUserList(state);
    expect(userList).toHaveLength(0);
  });
  it('should return the appropriate list of users with their active state', () => {
    const state = {
      activeUsers: [
        {
          id: 0,
          name: 'Justin'
        }
      ],
      allUsers,
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
    const error = { email: 'Email error' };
    const state = {
      errors: errors(errorsInitialState, hasErrors(error))
    };
    const emailError = getEmailError(state);

    expect(emailError).toEqual(error.email);
  });

  it('should get the correct password error', () => {
    const error = { password: 'Password Error' };
    const state = {
      errors: errors(errorsInitialState, hasErrors(error))
    };
    const passwordError = getPasswordError(state);

    expect(passwordError).toEqual(error.password);
  });

  it('should get the correct password confirmation error', () => {
    const error = { passwordConfirmation: 'Password Confirmation Error' };
    const state = {
      errors: errors(errorsInitialState, hasErrors(error))
    };
    const passwordConfirmationError = getPasswordConfirmationError(state);

    expect(passwordConfirmationError).toEqual(error.passwordConfirmation);
  });

  it('should get the correct name error', () => {
    const error = { name: 'Name error' };
    const state = {
      errors: errors(errorsInitialState, hasErrors(error))
    };
    const nameError = getNameError(state);

    expect(nameError).toEqual(error.name);
  });

  it('should not grab the incorrect error given multiple errors available', () => {
    const error = { name: 'Name error' };
    const state = {
      errors: errors(errorsInitialState, hasErrors(error))
    };

    const error2 = { email: 'Email error' };
    const state2 = {
      errors: errors(state.errors, hasErrors(error2))
    };
    const nameError = getNameError(state2);

    expect(nameError).toEqual(error.name);
  });
});

describe('getIsAuthenticated selector', () => {
  const loggedInUser = {
    admin: true,
    id: 1,
    name: 'Justin'
  };

  it('should return false when not logged in', () => {
    const state = {
      currentUser: currentUser(currentUserInitialState, {})
    };

    const isAuthenticated = getIsAuthenticated(state);
    expect(isAuthenticated).toEqual(false);
  });

  it('should return true when logged in', () => {
    const state = {
      currentUser: currentUser(
        currentUserInitialState,
        setCurrentUser(loggedInUser)
      )
    };

    const isAuthenticated = getIsAuthenticated(state);
    expect(isAuthenticated).toEqual(true);
  });
});

describe('getIsAdmin selector', () => {
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
  it('should return false for a non-admin user', () => {
    const state = {
      currentUser: currentUser(
        currentUserInitialState,
        setCurrentUser(otherUsers[0])
      )
    };

    const isAdmin = getIsAdmin(state);
    expect(isAdmin).toEqual(false);
  });

  it('should return true for an admin user', () => {
    const state = {
      currentUser: currentUser(
        currentUserInitialState,
        setCurrentUser(loggedInUser)
      )
    };

    const isAdmin = getIsAdmin(state);
    expect(isAdmin).toEqual(true);
  });
});
