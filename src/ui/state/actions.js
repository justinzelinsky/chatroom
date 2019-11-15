export const UPDATE_ACTIVE_USERS = 'UPDATE_ACTIVE_USERS';
export const updateActiveUsers = usernames => ({
  type: UPDATE_ACTIVE_USERS,
  payload: {
    usernames
  }
});

export const ADD_CHAT = 'ADD_CHAT';
export const addChat = (message, ts, user, isLocalMessage = true) => ({
  type: ADD_CHAT,
  payload: {
    isLocalMessage,
    isAdminMessage: false,
    message,
    ts,
    user
  }
});

export const ADD_ADMIN_CHAT = 'ADD_ADMIN_CHAT';
export const addAdminChat = (message, ts, user) => ({
  type: ADD_ADMIN_CHAT,
  payload: {
    isAdminMessage: true,
    message,
    ts,
    user
  }
});

export const LOGIN = 'LOGIN';
export const login = (email, password) => ({
  type: LOGIN,
  payload: {
    email,
    password
  }
});

export const LOGOUT = 'LOGOUT';
export const logout = () => ({
  type: LOGOUT
});

export const REGISTER = 'REGISTER';
export const register = (name, email, password, password2) => ({
  type: REGISTER,
  payload: {
    name,
    email,
    password,
    password2
  }
});

export const SECRET = 'SECRET';
export const trySecret = () => ({
  type: SECRET
});

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const setCurrentUser = currentUser => ({
  type: SET_CURRENT_USER,
  payload: {
    currentUser
  }
});

export const HAS_ERRORS = 'HAS_ERRORS';
export const hasErrors = errors => ({
  type: HAS_ERRORS,
  payload: {
    errors
  }
});

export const SET_DARK_MODE = 'SET_DARK_MODE';
export const setDarkMode = isDarkMode => ({
  type: SET_DARK_MODE,
  payload: {
    isDarkMode
  }
});

export const REQUEST_MESSAGES = 'REQUEST_MESSAGES';
export const requestMessages = () => ({
  type: REQUEST_MESSAGES
});

export const RECEIVED_MESSAGES = 'RECEIVED_MESSAGES';
export const receivedMessages = messages => ({
  type: RECEIVED_MESSAGES,
  payload: {
    messages
  }
});

export const PAGE_LOAD = 'PAGE_LOAD';
export const pageLoad = () => ({
  type: PAGE_LOAD
});

export const CLEAR_CHAT_HISTORY = 'CLEAR_CHAT_HISTORY';
export const clearChatHistory = () => ({
  type: CLEAR_CHAT_HISTORY
});

export const CHAT_HISTORY_CLEARED = 'CHAT_HISTORY_CLEARED';
export const chatHistoryCleared = () => ({
  type: CHAT_HISTORY_CLEARED
});

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const showNotification = notification => ({
  type: SHOW_NOTIFICATION,
  payload: {
    notification
  }
});

export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';
export const hideNotification = () => ({
  type: HIDE_NOTIFICATION
});

export default {
  addAdminChat,
  addChat,
  chatHistoryCleared,
  clearChatHistory,
  hasErrors,
  hideNotification,
  login,
  logout,
  receivedMessages,
  pageLoad,
  register,
  requestMessages,
  setCurrentUser,
  setDarkMode,
  showNotification,
  trySecret,
  updateActiveUsers
};
