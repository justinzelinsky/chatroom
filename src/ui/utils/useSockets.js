import Push from 'push.js';
import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

import {
  addChat,
  addAdminChat,
  setUsersTyping,
  updateActiveUsers
} from 'state/actions';
import {
  closeSocket,
  emitAddedUser,
  openSocket,
  subscribeToChatEvents,
  subscribeToAdminChatEvents,
  subscribeToUserEvents,
  subscribeToTypingEvents
} from 'utils/socket';

const documentTitle = document.title;
let unreadNotifications = 0;

const useSockets = () => {
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    const { currentUser } = store.getState();

    openSocket();

    emitAddedUser(currentUser);

    subscribeToChatEvents(chat => {
      const { user, message, ts } = chat;
      dispatch(addChat({ isLocalMessage: false, message, ts, user }));

      if (document.hidden) {
        unreadNotifications++;
        document.title = `${documentTitle} (${unreadNotifications})`;
        if (Push.Permission.has()) {
          Push.create('Chatroom', {
            body: `${user.name}: ${message}`
          });
        }
        const onDocumentFocus = () => {
          if (!document.hidden) {
            unreadNotifications = 0;
            document.title = documentTitle;
            document.removeEventListener('visibilitychange', onDocumentFocus);
          }
        };

        document.addEventListener('visibilitychange', onDocumentFocus);
      }
    });

    subscribeToAdminChatEvents(chat => dispatch(addAdminChat(chat)));

    subscribeToTypingEvents(usersTyping =>
      dispatch(setUsersTyping(usersTyping))
    );

    subscribeToUserEvents(usernames => {
      dispatch(updateActiveUsers(usernames));
    });
  }, []);

  return () => closeSocket();
};

export default useSockets;
