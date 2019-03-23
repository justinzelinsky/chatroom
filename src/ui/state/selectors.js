import { createSelector } from 'reselect';

const getActiveUsers = state => state.activeUsers;

export const getFormattedActiveUsers = createSelector(
  getActiveUsers,
  activeUsers => activeUsers.join(', ')
);

const getCurrentUser = state => state.currentUser;

export const getCurrentUserName = createSelector(
  getCurrentUser,
  currentUser => currentUser.name
);

const getErrors = state => state.errors;

export const getEmailError = createSelector(
  getErrors,
  errors => errors.email
);

export const getPasswordError = createSelector(
  getErrors,
  errors => errors.password
);

export const getPassword2Error = createSelector(
  getErrors,
  errors => errors.password2
);

export const getNameError = createSelector(
  getErrors,
  errors => errors.name
);
