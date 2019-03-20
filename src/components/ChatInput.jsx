import {
  func,
  string
} from 'prop-types';
import React, { useState } from 'react';
import {
  FormControl,
  FormGroup, 
  InputGroup
} from 'react-bootstrap';

const ChatInput = ({ onSubmit, username }) => {
  const [ message, setMessage ] = useState('');

  const onChange = event => {
    setMessage(event.target.value);
  };

  const onKeyPress = event => {
    if (event.key === 'Enter' && message) {
      const chat = { username, message };
      onSubmit(chat);
      setMessage('');
    }
  };

  return (
    <FormGroup>
      <InputGroup>
        <InputGroup.Addon>
          {username}  
        </InputGroup.Addon>
        <FormControl autoFocus={true} 
                     onChange={onChange} 
                     onKeyPress={onKeyPress} 
                     type="text" />
      </InputGroup>
    </FormGroup>
  );
};

ChatInput.propTypes = {
  onSubmit: func.isRequired,
  username: string.isRequired
};

export default ChatInput;
