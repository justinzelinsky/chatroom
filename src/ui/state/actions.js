export const UPDATE_ACTIVE_USERS = 'UPDATE_ACTIVE_USERS';
export const updateActiveUsers = usernames => ({
  type: UPDATE_ACTIVE_USERS,
  payload: {
    usernames
  }
});

export const ADD_CHAT = 'ADD_CHAT';
export const addChat = (message, ts, username) => ({
  type: ADD_CHAT,
  payload: {
    chat: {
      isAdminMessage: false,
      message,
      ts,
      username
    }
  }
});

export const ADD_ADMIN_CHAT = 'ADD_ADMIN_CHAT';
export const addAdminChat = (message, ts, username) => ({
  type: ADD_ADMIN_CHAT,
  payload: {
    chat: {
      isAdminMessage: true,
      message,
      ts,
      username
    }
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

export default {
  addChat,
  addAdminChat,
  updateActiveUsers,
  login,
  logout,
  register,
  setCurrentUser,
  hasErrors,
  trySecret
};
