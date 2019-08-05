import dayjs from 'dayjs';

import { addChat, setCurrentUser } from 'state/actions';
import {
  chats,
  chatsInitialState,
  currentUser,
  currentUserInitialState
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
});
