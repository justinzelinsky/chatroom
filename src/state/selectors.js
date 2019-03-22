import { createSelector } from 'reselect';

export const getActiveUsers = state => state.activeUsers;

export const getFormattedActiveUsers = createSelector(
  getActiveUsers,
  activeUsers => activeUsers.join(', ')
);
