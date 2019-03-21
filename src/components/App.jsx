import { bool } from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Chatroom from 'components/Chatroom';
import UsernameInput from 'components/UsernameInput';

const App = ({ usernameSelected }) => (
  <Fragment>
    { usernameSelected 
        ? <Chatroom />
        : <UsernameInput />
    }
  </Fragment>
);

App.propTypes = {
  usernameSelected: bool.isRequired
};

const mapStateToProps = state => ({
  usernameSelected: state.usernameSelected
});

export default connect(mapStateToProps)(App);
