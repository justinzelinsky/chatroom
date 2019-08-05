import dayjs from 'dayjs';
import { LOCATION_CHANGE } from 'connected-react-router';

import {
  addAdminChat,
  addChat,
  hasErrors,
  setCurrentUser,
  updateActiveUsers
} from 'state/actions';
import {
  activeUsers,
  activeUsersInitialState,
  chats,
  chatsInitialState,
  currentUser,
  currentUserInitialState,
  errors,
  errorsInitialState,
  isAuthenticated,
  isAuthenticatedInitialState
} from 'state/reducers';

describe('Current User Reducer', () => {
  it('should correctly set the initial state of the active user', () => {
    const state = currentUser(currentUserInitialState, {});

    expect(state).toEqual(currentUserInitialState);
  });

  it('should accurately set the current user', () => {
    const currentUserObj = {
      id: '123',
      name: 'Justin',
      iat: 456,
      exp: 789
    };
    const action = setCurrentUser(currentUserObj);
    const state = currentUser(currentUserInitialState, action);

    expect(state).toEqual(currentUserObj);
  });
});

describe('Chat Reducer', () => {
  it('should correctly set the initial state of the chatroom', () => {
    const state = chats(chatsInitialState, {});

    expect(state).toEqual([]);
  });

  it('shuld add chats', () => {
    const state = chats(chatsInitialState, {});
    const time = dayjs().format('HH:mm');
    const action = addChat('Hello', time, 'Justin Zelinsky');

    const state2 = chats(state, action);

    expect(state2).toHaveLength(1);

    const chat = state2[0];

    expect(chat.isAdminMessage).toBeFalsy();
    expect(chat.username).toEqual('Justin Zelinsky');
    expect(chat.message).toEqual('Hello');
    expect(chat.ts).toEqual(time);
  });

  it('should add admin chats', () => {
    const state = chats(chatsInitialState, {});

    const time = dayjs().format('HH:mm');
    const action = addChat('Hello', time, 'Justin Zelinsky');
    const state2 = chats(state, action);

    const time2 = dayjs().format('HH:mm');
    const action2 = addAdminChat('Hello Admin', time2, 'Admin');
    const state3 = chats(state2, action2);

    expect(state3).toHaveLength(2);
    expect(state3.filter(chat => chat.isAdminMessage)).toHaveLength(1);
    expect(state3.filter(chat => !chat.isAdminMessage)).toHaveLength(1);

    const normalChat = state3.find(chat => !chat.isAdminMessage);
    const adminChat = state3.find(chat => chat.isAdminMessage);

    expect(normalChat.isAdminMessage).toBeFalsy();
    expect(normalChat.username).toEqual('Justin Zelinsky');
    expect(normalChat.message).toEqual('Hello');
    expect(normalChat.ts).toEqual(time);

    expect(adminChat.isAdminMessage).toBeTruthy();
    expect(adminChat.username).toEqual('Admin');
    expect(adminChat.message).toEqual('Hello Admin');
    expect(adminChat.ts).toEqual(time2);
  });
});

describe('Authentication', () => {
  it('should not be authenticated by default', () => {
    const state = isAuthenticated(isAuthenticatedInitialState, {});

    expect(state).toBeFalsy();
  });

  it('should be authenticated when current user is set', () => {
    const state = isAuthenticated(isAuthenticatedInitialState, {});

    const currentUserObj = {
      id: '123',
      name: 'Justin',
      iat: 456,
      exp: 789
    };
    const action = setCurrentUser(currentUserObj);
    const state2 = isAuthenticated(state, action);

    expect(state2).toBeTruthy();
  });
});

describe('Active Users', () => {
  it('should have no active users by default', () => {
    const state = activeUsers(activeUsersInitialState, {});

    expect(state).toEqual([]);
  });

  it('should properly update active users', () => {
    const state = activeUsers(activeUsersInitialState, {});
    const usernames = ['Justin'];
    const action = updateActiveUsers(usernames);
    const state2 = activeUsers(state, action);

    expect(state2).toHaveLength(1);

    usernames.push('Sam');
    const action2 = updateActiveUsers(usernames);
    const state3 = activeUsers(state2, action2);

    expect(state3).toHaveLength(2);
    expect(state3).toEqual(usernames);
  });
});

describe('Errors', () => {
  it('should have no errors by default', () => {
    const state = errors(errorsInitialState, {});

    expect(state).toEqual(errorsInitialState);
  });

  it('should capture errors', () => {
    const state = errors(errorsInitialState, {});

    const error = { email: 'Email error' };
    const action = hasErrors(error);
    const state2 = errors(state, action);

    expect(state2).toHaveProperty('email');
    expect(state2.email).toEqual('Email error');
  });

  it('should clear errors on location change', () => {
    const state = errors(errorsInitialState, {});
    const error = { email: 'Email error' };
    const action = hasErrors(error);
    const state2 = errors(state, action);

    expect(state2).toHaveProperty('email');
    expect(state2.email).toEqual('Email error');

    const action2 = { type: LOCATION_CHANGE };
    const state3 = errors(state2, action2);

    expect(state3).toEqual(errorsInitialState);
  });
});
