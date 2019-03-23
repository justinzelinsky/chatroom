import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Chatroom from 'components/Chatroom';
import UsernameInput from 'components/UsernameInput';

const App = () => (
  <Switch>
      <Route component={Chatroom}
             path="/chatroom" />
      <Route component={UsernameInput} />
  </Switch>
);

export default App;
