import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Well,
  Row,
  Col,
  Grid
} from 'react-bootstrap';

import { 
  subscribeToChatEvents,
  subscribeToUserEvents,
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
    subscribeToChatEvents(chat => updateChats(chat));
    subscribeToUserEvents(usersInChat => addUserToChat(usersInChat));
  });

  const formattedUsersInChat = usersInChat.join(', ');

  return (
    <div>
      <Well>
        <Grid>
          { chats.length === 0 && (
            <Row>
              <Col>No Chats!</Col>
            </Row>
          )}
          { chats.map((chat, idx) => <ChatMessage chat={chat}
                                                  key={idx} />)}
        </Grid>
      </Well>
      <ChatInput username={username} 
                 onSubmit={onNewChatSubmit} />
      <div>Users in the chat: {formattedUsersInChat}</div>
    </div>
  );
};

Chatroom.propTypes = {
  username: string.isRequired
};

export default Chatroom;
