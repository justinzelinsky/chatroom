import { createSelector } from 'reselect';

const getCurrentUser = state => state.currentUser;
const getActiveUsers = state => state.activeUsers;

export const getCurrentUserName = createSelector(
  getCurrentUser,
  currentUser => currentUser.name
);

const getErrors = state => state.errors;

export const getEmailError = createSelector(getErrors, errors => errors.email);

export const getPasswordError = createSelector(
  getErrors,
  errors => errors.password
);

export const getPassword2Error = createSelector(
  getErrors,
  errors => errors.password2
);

export const getNameError = createSelector(getErrors, errors => errors.name);

export const getActiveUserList = createSelector(
  getCurrentUser,
  getActiveUsers,
  (currentUser, activeUsers) => {
    const otherUsers = activeUsers
      .filter(user => user.id !== currentUser.id)
      .map(({ id, name }) => ({ id, name }));
    return [
      {
        id: currentUser.id,
        isSelf: true,
        name: currentUser.name
      },
      ...otherUsers
    ];
  }
);
