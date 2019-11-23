import { connectRouter, LOCATION_CHANGE } from 'connected-react-router';
import dayjs from 'dayjs';
import { combineReducers } from 'redux';

import {
  ADD_CHAT,
  ADD_ADMIN_CHAT,
  CHAT_HISTORY_CLEARED,
  HAS_ERRORS,
  HIDE_NOTIFICATION,
  RECEIVED_ALL_USERS,
  RECEIVED_MESSAGES,
  SET_CURRENT_USER,
  SET_DARK_MODE,
  SHOW_NOTIFICATION,
  UPDATE_ACTIVE_USERS
} from 'state/actions';

export const currentUserInitialState = {};
export const currentUser = (state = currentUserInitialState, action) => {
  return action.type === SET_CURRENT_USER
    ? { ...action.payload.currentUser }
    : state;
};

export const activeUsersInitialState = [];
export const activeUsers = (state = activeUsersInitialState, action) => {
  return action.type === UPDATE_ACTIVE_USERS
    ? [...action.payload.users]
    : state;
};

export const allUsersInitialState = [];
export const allUsers = (state = allUsersInitialState, action) => {
  return action.type === RECEIVED_ALL_USERS ? [...action.payload.users] : state;
};

export const errorsInitialState = {};
export const errors = (state = errorsInitialState, action) => {
  switch (action.type) {
    case HAS_ERRORS:
      return {
        ...state,
        ...action.payload.errors
      };
    case LOCATION_CHANGE:
      return errorsInitialState;
    default:
      return state;
  }
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

  if (action.type === CHAT_HISTORY_CLEARED) {
    return chatsInitialState;
  }

  if (action.type === RECEIVED_MESSAGES) {
    const {
      payload: { messages }
    } = action;

    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const lastMessageTimestamp = dayjs(lastMessage.ts).format(
        'MM/DD/YYYY HH:MM'
      );
      const lastMessageSent = {
        isAdminMessage: true,
        message: `Last message sent at ${lastMessageTimestamp}`,
        ts: dayjs().valueOf(),
        user: {
          name: 'Admin'
        }
      };
      return [...messages, lastMessageSent];
    }
  }

  return state;
};

export const darkModeInitialState = false;
export const darkMode = (state = darkModeInitialState, action) => {
  return action.type === SET_DARK_MODE ? action.payload.isDarkMode : state;
};

export const notificationInitialState = null;
export const notification = (state = notificationInitialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return action.payload.notification;
    case HIDE_NOTIFICATION:
      return notificationInitialState;
    default:
      return state;
  }
};

export default history =>
  combineReducers({
    activeUsers,
    allUsers,
    chats,
    currentUser,
    darkMode,
    errors,
    notification,
    router: connectRouter(history)
  });
