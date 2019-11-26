export const ADD_ADMIN_CHAT = 'ADD_ADMIN_CHAT';
export const addAdminChat = ({ message, ts, user }) => ({
  type: ADD_ADMIN_CHAT,
  payload: {
    isAdminMessage: true,
    message,
    ts,
    user
  }
});

export const ADD_CHAT = 'ADD_CHAT';
export const addChat = ({ isLocalMessage = true, message, ts, user }) => ({
  type: ADD_CHAT,
  payload: {
    isLocalMessage,
    isAdminMessage: false,
    message,
    ts,
    user
  }
});

export const CHAT_HISTORY_CLEARED = 'CHAT_HISTORY_CLEARED';
export const chatHistoryCleared = () => ({
  type: CHAT_HISTORY_CLEARED
});

export const CLEAR_CHAT_HISTORY = 'CLEAR_CHAT_HISTORY';
export const clearChatHistory = () => ({
  type: CLEAR_CHAT_HISTORY
});

export const HAS_ERRORS = 'HAS_ERRORS';
export const hasErrors = errors => ({
  type: HAS_ERRORS,
  payload: {
    errors
  }
});

export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';
export const hideNotification = () => ({
  type: HIDE_NOTIFICATION
});

export const LOGIN = 'LOGIN';
export const login = ({ email, password }) => ({
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

export const PAGE_LOAD = 'PAGE_LOAD';
export const pageLoad = () => ({
  type: PAGE_LOAD
});

export const RECEIVED_ALL_USERS = 'RECEIVED_ALL_USERS';
export const receivedAllUsers = users => ({
  type: RECEIVED_ALL_USERS,
  payload: {
    users
  }
});

export const RECEIVED_MESSAGES = 'RECEIVED_MESSAGES';
export const receivedMessages = messages => ({
  type: RECEIVED_MESSAGES,
  payload: {
    messages
  }
});

export const REGISTER = 'REGISTER';
export const register = ({ name, email, password, passwordConfirmation }) => ({
  type: REGISTER,
  payload: {
    name,
    email,
    password,
    passwordConfirmation
  }
});

export const REQUEST_ALL_USERS = 'REQUEST_ALL_USERS';
export const requestAllUsers = () => ({
  type: REQUEST_ALL_USERS
});

export const REQUEST_MESSAGES = 'REQUEST_MESSAGES';
export const requestMessages = () => ({
  type: REQUEST_MESSAGES
});

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const setCurrentUser = currentUser => ({
  type: SET_CURRENT_USER,
  payload: {
    currentUser
  }
});

export const SET_DARK_MODE = 'SET_DARK_MODE';
export const setDarkMode = isDarkMode => ({
  type: SET_DARK_MODE,
  payload: {
    isDarkMode
  }
});

export const SET_USERS_TYPING = 'SET_USERS_TYPING';
export const setUsersTyping = usersTyping => ({
  type: SET_USERS_TYPING,
  payload: {
    usersTyping
  }
});

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const showNotification = ({ message, variant = 'primary' }) => ({
  type: SHOW_NOTIFICATION,
  payload: {
    notification: {
      message,
      variant
    }
  }
});

export const USER_STARTS_TYPING = 'USER_STARTS_TYPING';
export const userStartsTyping = () => ({
  type: USER_STARTS_TYPING
});

export const USER_STOPS_TYPING = 'USER_STOPS_TYPING';
export const userStopsTyping = () => ({
  type: USER_STOPS_TYPING
});

export const UPDATE_ACTIVE_USERS = 'UPDATE_ACTIVE_USERS';
export const updateActiveUsers = users => ({
  type: UPDATE_ACTIVE_USERS,
  payload: {
    users
  }
});

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const updateProfile = ({ email, name }) => ({
  type: UPDATE_PROFILE,
  payload: {
    email,
    name
  }
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
  pageLoad,
  receivedAllUsers,
  receivedMessages,
  register,
  requestAllUsers,
  requestMessages,
  setCurrentUser,
  setDarkMode,
  setUsersTyping,
  showNotification,
  updateActiveUsers,
  updateProfile,
  userStartsTyping,
  userStopsTyping
};
