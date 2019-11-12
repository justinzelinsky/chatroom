import { createLogic } from 'redux-logic';

import { LOGOUT, setCurrentUser } from 'state/actions';

const logoutLogic = createLogic({
  type: LOGOUT,
  process({ get, setAuthToken }, dispatch, done) {
    get('api/users/logout').then(() => {
      localStorage.removeItem('jwtToken');
      setAuthToken(false);
      dispatch(setCurrentUser({}));
      done();
    });
  }
});

export default logoutLogic;
