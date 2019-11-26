import './style.scss';

import classnames from 'classnames';
import React, { useState } from 'react';
import { Button, Form, Jumbotron } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import actions from 'state/actions';

const Profile = () => {
  const { currentUser, darkMode } = useSelector(state => ({
    currentUser: state.currentUser,
    darkMode: state.darkMode
  }));
  const dispatch = useDispatch();
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  const profileClassname = classnames('profile', { 'dark-mode': darkMode });
  const disableButton = !name;
  const handleProfileUpdate = event => {
    event.preventDefault();

    if (!disableButton) {
      dispatch(actions.updateProfile({ email, name }));
    }
  };

  const onNameChange = event => setName(event.target.value);
  const onEmailChange = event => setEmail(event.target.value);

  return (
    <Jumbotron styleName={profileClassname}>
      <h1>Profile</h1>
      <hr />
      <Form autoComplete="off" onSubmit={handleProfileUpdate}>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            autoFocus={true}
            onChange={onNameChange}
            type="text"
            value={name}
          />
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            autoFocus={true}
            onChange={onEmailChange}
            type="text"
            value={email}
          />
        </Form.Group>
        <Button type="submit">Update Profile</Button>
      </Form>
    </Jumbotron>
  );
};

export default Profile;
