import { func } from 'prop-types';
import React from 'react';
import {
  FormGroup,
  InputGroup,
  FormControl
} from 'react-bootstrap';

const UsernameInput = ({ onChange, onSubmit }) => {
  const onKeyPress = event => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <FormGroup>
      <InputGroup>
        <InputGroup.Addon>Enter your username</InputGroup.Addon>
        <FormControl autoFocus={true} 
                     type="text" 
                     onKeyPress={onKeyPress} 
                     onChange={onChange} />
      </InputGroup>
    </FormGroup>
  );
};

UsernameInput.propTypes = {
  onChange: func.isRequired,
  onSubmit: func.isRequired
};

export default UsernameInput;
