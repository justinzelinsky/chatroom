import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

import { addChat, addAdminChat, updateActiveUsers } from 'state/actions';
import {
  closeSocket,
  emitAddedUser,
  openSocket,
  subscribeToChatEvents,
  subscribeToAdminChatEvents,
  subscribeToUserEvents
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
      dispatch(addChat(message, ts, user, false));

      if (document.hidden) {
        unreadNotifications++;
        document.title = `${documentTitle} (${unreadNotifications})`;
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

    subscribeToAdminChatEvents(chat => {
      const { user, message, ts } = chat;
      dispatch(addAdminChat(message, ts, user));
    });

    subscribeToUserEvents(usernames => {
      dispatch(updateActiveUsers(usernames));
    });
  }, []);

  return () => closeSocket();
};

export default useSockets;
