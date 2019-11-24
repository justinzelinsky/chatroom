import { createSelector } from 'reselect';

import isEmpty from 'utils/isEmpty';

const getCurrentUser = state => state.currentUser;
const getActiveUsers = state => state.activeUsers;
const getAllUsers = state => state.allUsers;
const getErrors = state => state.errors;

export const getEmailError = createSelector(getErrors, errors => errors.email);

export const getPasswordError = createSelector(
  getErrors,
  errors => errors.password
);

export const getPasswordConfirmationError = createSelector(
  getErrors,
  errors => errors.passwordConfirmation
);

export const getNameError = createSelector(getErrors, errors => errors.name);

export const getUserList = createSelector(
  getActiveUsers,
  getCurrentUser,
  getAllUsers,
  (activeUsers, currentUser, allUsers) => {
    if (!currentUser || activeUsers.length === 0) {
      return [];
    }
    const allUserList = allUsers.map(user => {
      const isSelf = user.id === currentUser.id;
      const isActive = activeUsers.some(
        activeUser => activeUser.id === user.id
      );
      return {
        id: user.id,
        isActive,
        isSelf,
        name: user.name
      };
    });
    const loggedInUser = allUserList.find(user => user.id === currentUser.id);
    const otherUsers = allUserList.filter(user => user.id !== currentUser.id);
    return [loggedInUser, ...otherUsers];
  }
);

export const getIsAuthenticated = createSelector(
  getCurrentUser,
  currentUser => !isEmpty(currentUser)
);

export const getIsAdmin = createSelector(
  getCurrentUser,
  currentUser => !!currentUser.admin
);
