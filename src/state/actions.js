export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const updateUsername = username => ({
  type: UPDATE_USERNAME,
  payload: {
    username
  }
});

export const SELECTED_USERNAME = 'SELECTED_USERNAME';
export const selectedUsername = () => ({
  type: SELECTED_USERNAME
});

export const USER_JOINED = 'USER_JOINED';
export const userJoined = usernames => ({
  type: USER_JOINED,
  payload: {
    usernames
  }
});

export const USER_LEFT = 'USER_LEFT';
export const userLeft = usernames => ({
  type: USER_LEFT,
  payload: {
    usernames
  }
});

export const ADD_CHAT = 'ADD_CHAT';
export const addChat = ({ isSystemMessage = false, username, message }) => ({
  type: ADD_CHAT,
  payload: {
    message,
    username,
    isSystemMessage
  }
});

export default {
  addChat,
  updateUsername,
  userJoined,
  userLeft,
  selectedUsername
};

