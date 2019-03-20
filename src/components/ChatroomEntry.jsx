import React, { useState } from 'react';
import {
  Jumbotron,
  Row,
  Col,
  Grid
} from 'react-bootstrap';

import Chatroom from 'components/Chatroom';
import UsernameInput from 'components/UsernameInput';
import { emitAddedUser } from './socket';

const ChatroomEntry = () => {
  const [username, setUsername] = useState('');
  const [usernameSelected, setUsernameSelected] = useState(false);

  const onChange = event => {
    setUsername(event.target.value);
  };

  const onSubmit = () => {
    setUsernameSelected(true);
    emitAddedUser(username);
  };
  
  return (
    <Grid> 
      <Row>
        <Col>
          <Jumbotron>
            { usernameSelected && <Chatroom username={username}/>}
            {! usernameSelected && <UsernameInput onChange={onChange}
                                                  onSubmit={onSubmit} />}
          </Jumbotron>
        </Col>
      </Row>
    </Grid>
  );
};

export default ChatroomEntry;
