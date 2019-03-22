import { combineReducers } from 'redux';

import {
  ADD_CHAT,
  SELECTED_USERNAME,
  UPDATE_USERNAME,
  UPDATE_ACTIVE_USERS
} from 'state/actions';

export const usernameInitialState = '';
export const username = (state = usernameInitialState, action) => {
  if (action.type === UPDATE_USERNAME) {
    return action.payload.username;
  }

  return state;
};

export const usernameSelectedInitialState = false;
export const usernameSelected = (state = usernameSelectedInitialState, action) => {
  if (action.type === SELECTED_USERNAME) {
    return true;
  }
  return state;
};

export const activeUsersInitialState = [];
export const activeUsers = (state = activeUsersInitialState, action) => {
  if (action.type === UPDATE_ACTIVE_USERS) {
    const { usernames } = action.payload;
    return [
      ...usernames
    ];
  }

  return state;
};

export const chatsInitialState = [];
export const chats = (state = chatsInitialState, action) => {
  if (action.type === ADD_CHAT) {
    const { isAdminMessage, message, ts, username } = action.payload;
    return [
      ...state,
      {
        isAdminMessage,
        message,
        ts,
        username
      }
    ];
  }

  return state;
};

export default combineReducers({
  activeUsers,
  chats,
  username,
  usernameSelected
});
