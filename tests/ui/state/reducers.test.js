import dayjs from 'dayjs';
import { LOCATION_CHANGE } from 'connected-react-router';

import {
  hasErrors,
  addChat,
  receivedMessages,
  chatHistoryCleared,
  setDarkMode,
  showNotification,
  hideNotification,
  addAdminChat
} from 'ui/state/actions';
import createRootReducer, {
  activeUsers,
  activeUsersInitialState,
  allUsers,
  allUsersInitialState,
  currentUser,
  currentUserInitialState,
  errors,
  errorsInitialState,
  chats,
  chatsInitialState,
  darkMode,
  darkModeInitialState,
  notification,
  notificationInitialState
} from 'ui/state/reducers';

describe('allUsers reducer', () => {
  it('should return the existing state for an unrelated action', () => {
    const state = {
      allUsers: allUsers(allUsersInitialState, {})
    };
    expect(state.allUsers).toEqual(allUsersInitialState);
  });
});

describe('currentUser reducer', () => {
  it('should return the existing state for an unrelated action', () => {
    const state = {
      currentUser: currentUser(currentUserInitialState, {})
    };
    expect(state.currentUser).toEqual(currentUserInitialState);
  });
});

describe('activeUsers reducer', () => {
  it('should return the existing state for an unrelated action', () => {
    const state = {
      activeUsers: activeUsers(activeUsersInitialState, {})
    };
    expect(state.activeUsers).toEqual(activeUsersInitialState);
  });
});

describe('errors reducer', () => {
  it('should return the existing state for an unrelated action', () => {
    const state = {
      errors: errors(errorsInitialState, { type: 'Foo' })
    };
    expect(state.errors).toEqual(errorsInitialState);
  });

  it('should update the state when an error action has been dispatched', () => {
    const error = {
      email: 'some error'
    };
    const state = {
      errors: errors(errorsInitialState, hasErrors(error))
    };
    expect(state.errors).toEqual(error);
  });

  it('should reset the state on a location change', () => {
    const error = {
      email: 'some error'
    };
    const state = {
      errors: errors(errorsInitialState, hasErrors(error))
    };
    expect(state.errors).toEqual(error);

    const state2 = {
      errors: errors(state.errors, { type: LOCATION_CHANGE })
    };
    expect(state2.errors).toEqual(errorsInitialState);
  });
});

describe('chats reducer', () => {
  const chatList = [
    {
      message: 'Hello World',
      ts: dayjs().valueOf(),
      user: {
        name: 'Justin'
      }
    },
    {
      message: 'Konnichiwa!',
      ts: dayjs().valueOf(),
      user: {
        name: 'Justin-San'
      }
    },
    {
      message: 'Bonjour',
      ts: dayjs().valueOf(),
      user: {
        name: 'Pierre'
      }
    }
  ];

  it('should return the existing state for an unrelated action', () => {
    const state = {
      chats: chats(chatsInitialState, {})
    };
    expect(state.chats).toEqual(chatsInitialState);
  });

  it('should update the chat array when a new chat is added', () => {
    const state = {
      chats: chats(chatsInitialState, {})
    };
    const user = {
      name: 'Justin'
    };
    const ts = dayjs().valueOf();
    const chatMessage = 'Konnichiwa!';
    const state2 = {
      chats: chats(state.chats, addChat({ message: chatMessage, ts, user }))
    };
    expect(state2.chats).toHaveLength(1);
    expect(state2.chats[0].message).toEqual(chatMessage);
    expect(state2.chats[0].user).toEqual(user);
    expect(state2.chats[0].ts).toEqual(ts);
  });

  it('should update the chat array when a new admin chat is added', () => {
    const state = {
      chats: chats(chatsInitialState, {})
    };
    const user = {
      name: 'Justin'
    };
    const ts = dayjs().valueOf();
    const chatMessage = 'Konnichiwa!';
    const state2 = {
      chats: chats(
        state.chats,
        addAdminChat({ message: chatMessage, ts, user })
      )
    };
    expect(state2.chats).toHaveLength(1);
    expect(state2.chats[0].message).toEqual(chatMessage);
    expect(state2.chats[0].user).toEqual(user);
    expect(state2.chats[0].ts).toEqual(ts);
    expect(state2.chats[0].isAdminMessage).toEqual(true);
  });

  it('should return the initial state when no chats have been retrieved', () => {
    const state = {
      chats: chats(chatsInitialState, {})
    };
    const state2 = {
      chats: chats(state.chats, receivedMessages([]))
    };
    expect(state2.chats).toHaveLength(0);
  });

  it('should update the chats array with all messages retrieved', () => {
    const state = {
      chats: chats(chatsInitialState, {})
    };
    const state2 = {
      chats: chats(state.chats, receivedMessages(chatList))
    };
    expect(state2.chats).toHaveLength(4);

    const penultimateChat = state2.chats[state2.chats.length - 2];
    const penultimateChatTsFormatted = dayjs(penultimateChat.ts).format(
      'MM/DD/YYYY HH:MM'
    );

    const lastChat = state2.chats[state2.chats.length - 1];
    expect(lastChat.isAdminMessage).toEqual(true);
    expect(lastChat.message).toEqual(
      `Last message sent at ${penultimateChatTsFormatted}`
    );
  });

  it('should clear the chat history', () => {
    const state = {
      chats: chats(chatsInitialState, {})
    };
    const state2 = {
      chats: chats(state.chats, receivedMessages(chatList))
    };
    expect(state2.chats).toHaveLength(4);

    const state3 = {
      chats: chats(state2.chats, chatHistoryCleared())
    };
    expect(state3.chats).toEqual(chatsInitialState);
  });
});

describe('darkMode reducer', () => {
  it('should be off by default', () => {
    const state = {
      darkMode: darkMode(darkModeInitialState, {})
    };
    expect(state.darkMode).toEqual(false);
  });

  it('should be able to turn on when activated', () => {
    const state = {
      darkMode: darkMode(darkModeInitialState, {})
    };
    expect(state.darkMode).toEqual(false);
    const state2 = {
      darkMode: darkMode(state.darkMode, setDarkMode(true))
    };
    expect(state2.darkMode).toEqual(true);
  });
});

describe('notification reducer', () => {
  it('should return the existing state for an unrelated action', () => {
    const state = {
      notification: notification(notificationInitialState, {})
    };
    expect(state.notification).toEqual(notificationInitialState);
  });

  it('should display a notification', () => {
    const message = 'Hello, World!';
    const state = {
      notification: notification(
        notificationInitialState,
        showNotification({ message })
      )
    };
    expect(state.notification.message).toEqual(message);
    expect(state.notification.variant).toEqual('primary');

    const variant = 'warning';
    const state2 = {
      notification: notification(
        notificationInitialState,
        showNotification({ message, variant })
      )
    };
    expect(state2.notification.message).toEqual(message);
    expect(state2.notification.variant).toEqual(variant);
  });

  it('should hide a notification', () => {
    const message = 'Hello, World!';
    const state = {
      notification: notification(
        notificationInitialState,
        showNotification({ message })
      )
    };
    expect(state.notification.message).toEqual(message);

    const state2 = {
      notification: notification(state.notification, hideNotification())
    };
    expect(state2.notification).toEqual(notificationInitialState);
  });
});

describe('createRootReducer reducer', () => {
  it('should return a function', () => {
    const history = {};
    const rootReducer = createRootReducer(history);
    expect(typeof rootReducer).toEqual('function');
  });
});
