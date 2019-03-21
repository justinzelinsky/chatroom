import './Chatroom.scss';

import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { 
  subscribeToChatEvents,
  subscribeToUserEvents,
  emitAddedUser,
  emitNewChat
} from './socket';
import ChatInput from 'components/ChatInput';
import ChatMessage from 'components/ChatMessage';

const Chatroom = ({ username }) => {
  const [ chats, setChats ] = useState([]);
  const [ usersInChat, addUserToChat] = useState([]);

  const updateChats = chat => {
    const newChats = [
      ...chats,
      chat
    ];
    setChats(newChats);
  };

  const onNewChatSubmit = chat => {
    emitNewChat(chat);
    updateChats(chat);
  };

  useEffect(() => {
    emitAddedUser(username);
    subscribeToChatEvents(chat => updateChats(chat));
    subscribeToUserEvents(usersInChat => addUserToChat(usersInChat));
  });

  const formattedUsersInChat = usersInChat.join(', ');

  return (
    <div styleName="chatroom">
      <div styleName="chats">
        { chats.length === 0 && (
          <div styleName="no-chats">No Chats!</div>
        )}
        { chats.map((chat, idx) => <ChatMessage chat={chat}
                                                key={idx} />)}
        <div styleName="chat-footer">
          <ChatInput username={username} 
                     onSubmit={onNewChatSubmit} />
          <div>Users in the chat: {formattedUsersInChat}</div>
        </div>
      </div>
    </div>
  );
};

Chatroom.propTypes = {
  username: string.isRequired
};

const mapStateToProps = state => ({
  username: state.username
});

export default connect(mapStateToProps)(Chatroom);
