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
