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

export const UPDATE_ACTIVE_USERS = 'UPDATE_ACTIVE_USERS';
export const updateActiveUsers = (usernames) => ({
  type: UPDATE_ACTIVE_USERS,
  payload: {
    usernames
  }
});

export const ADD_CHAT = 'ADD_CHAT';
export const addChat = ({ isAdminMessage = false, message, ts, username }) => ({
  type: ADD_CHAT,
  payload: {
    isAdminMessage,
    message,
    ts,
    username
  }
});

export default {
  addChat,
  updateUsername,
  updateActiveUsers,
  selectedUsername
};

