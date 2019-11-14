import { connectRouter, LOCATION_CHANGE } from 'connected-react-router';
import { combineReducers } from 'redux';
import isEmpty from 'lodash/isEmpty';

import {
  ADD_CHAT,
  ADD_ADMIN_CHAT,
  UPDATE_ACTIVE_USERS,
  RECEIVED_MESSAGES,
  SET_CURRENT_USER,
  SET_DARK_MODE,
  HAS_ERRORS
} from 'state/actions';

export const currentUserInitialState = {};
export const currentUser = (state = currentUserInitialState, action) => {
  if (action.type === SET_CURRENT_USER) {
    const { currentUser } = action.payload;
    return {
      ...currentUser
    };
  }

  return state;
};

export const isAuthenticatedInitialState = false;
export const isAuthenticated = (
  state = isAuthenticatedInitialState,
  action
) => {
  if (action.type === SET_CURRENT_USER) {
    const { currentUser } = action.payload;
    return !isEmpty(currentUser);
  }

  return state;
};

export const activeUsersInitialState = [];
export const activeUsers = (state = activeUsersInitialState, action) => {
  if (action.type === UPDATE_ACTIVE_USERS) {
    const { usernames } = action.payload;
    return [...usernames];
  }

  return state;
};

export const errorsInitialState = {};
export const errors = (state = errorsInitialState, action) => {
  if (action.type === HAS_ERRORS) {
    const { errors } = action.payload;
    return {
      ...state,
      ...errors
    };
  }

  if (action.type === LOCATION_CHANGE) {
    return errorsInitialState;
  }

  return state;
};

export const chatsInitialState = [];
export const chats = (state = chatsInitialState, action) => {
  if (action.type === ADD_CHAT || action.type === ADD_ADMIN_CHAT) {
    return [
      ...state,
      {
        ...action.payload
      }
    ];
  }

  if (action.type === RECEIVED_MESSAGES) {
    return [...action.payload.messages];
  }

  return state;
};

export const darkModeInitialState = false;
export const darkMode = (state = darkModeInitialState, action) => {
  if (action.type === SET_DARK_MODE) {
    return action.payload.isDarkMode;
  }
  return state;
};

export default history =>
  combineReducers({
    activeUsers,
    chats,
    currentUser,
    darkMode,
    isAuthenticated,
    errors,
    router: connectRouter(history)
  });
