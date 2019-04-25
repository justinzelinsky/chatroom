import './Chatroom.scss';

import { array, object, string } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ChatInput from 'components/Chatroom/ChatInput';
import ChatMessage from 'components/Chatroom/ChatMessage';
import mapDispatchToProps from 'state/mapDispatchToProps';
import { getCurrentUserName } from 'state/selectors';
import {
  subscribeToChatEvents,
  subscribeToUserEvents,
  subscribeToAdminChatEvents,
  emitAddedUser,
  closeSocket
} from 'utils/Socket';

const Chatroom = ({ activeUsers, actions, chats, username }) => {
  const handleLogout = () => actions.logout();

  useEffect(() => {
    emitAddedUser(username);
    subscribeToChatEvents(chat => {
      const { username, message, ts } = chat;
      actions.addChat(message, ts, username);
    });
    subscribeToAdminChatEvents(chat => {
      const { username, message, ts } = chat;
      actions.addAdminChat(message, ts, username);
    });
    subscribeToUserEvents(usernames => actions.updateActiveUsers(usernames));

    return () => {
      closeSocket();
    };
  }, [username]);

  return (
    <div styleName="chatroom">
      <div styleName="users-in-chat-wrapper">
        <div styleName="users-in-chat-label">Users in the chat:</div>
        {activeUsers.map((user, idx) => (
          <div styleName="user-in-chat" key={idx}>
            {user}
          </div>
        ))}
      </div>
      <div styleName="chats">
        {chats.length === 0 && <div styleName="no-chats">No Chats!</div>}
        {chats.map((chat, idx) => (
          <ChatMessage chat={chat} key={idx} />
        ))}
      </div>
      <div styleName="chatroom-footer">
        <ChatInput />
        <a styleName="logout-link" onClick={handleLogout}>
          Logout
        </a>
      </div>
    </div>
  );
};

Chatroom.propTypes = {
  activeUsers: array.isRequired,
  actions: object.isRequired,
  chats: array.isRequired,
  username: string.isRequired
};

const mapStateToProps = state => ({
  activeUsers: state.activeUsers,
  chats: state.chats,
  username: getCurrentUserName(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chatroom);
