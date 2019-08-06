import dayjs from 'dayjs';

import {
  addAdminChat,
  ADD_ADMIN_CHAT,
  addChat,
  ADD_CHAT,
  hasErrors,
  HAS_ERRORS,
  login,
  LOGIN,
  logout,
  LOGOUT,
  register,
  REGISTER,
  setCurrentUser,
  SET_CURRENT_USER,
  trySecret,
  TRY_SECRET,
  updateActiveUsers,
  UPDATE_ACTIVE_USERS
} from 'state/actions';

describe('Action creators', () => {
  it('should create a proper add admin chat action', () => {
    const message = 'Hello';
    const username = 'Admin';
    const time = dayjs().format('HH:mm');
    const action = addAdminChat(message, time, username);

    expect(action).toHaveProperty('type');
    expect(action.type).toEqual(ADD_ADMIN_CHAT);
    expect(action).toHaveProperty('payload');

    const { payload } = action;

    expect(payload).toHaveProperty('chat');

    const { chat } = payload;

    expect(chat.message).toEqual(message);
    expect(chat.ts).toEqual(time);
    expect(chat.username).toEqual(username);
    expect(chat.isAdminMessage).toBeTruthy();
  });

  it('should create a proper add chat action', () => {
    const message = 'Hello';
    const username = 'Justin';
    const time = dayjs().format('HH:mm');
    const action = addChat(message, time, username);

    expect(action).toHaveProperty('type');
    expect(action.type).toEqual(ADD_CHAT);
    expect(action).toHaveProperty('payload');

    const { payload } = action;

    expect(payload).toHaveProperty('chat');

    const { chat } = payload;

    expect(chat.message).toEqual(message);
    expect(chat.ts).toEqual(time);
    expect(chat.username).toEqual(username);
    expect(chat.isAdminMessage).toBeFalsy();
  });

  it('should create a propery has error action', () => {
    const error = { email: 'Email error' };
    const action = hasErrors(error);

    expect(action).toHaveProperty('type');
    expect(action.type).toEqual(HAS_ERRORS);
    expect(action).toHaveProperty('payload');

    const { payload } = action;

    expect(payload).toHaveProperty('errors');

    const { errors } = payload;

    expect(errors.email).toEqual('Email error');
  });
});
