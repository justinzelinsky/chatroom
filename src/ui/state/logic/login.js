import jwt_decode from 'jwt-decode';
import { createLogic } from 'redux-logic';

import { hasErrors, LOGIN, setCurrentUser } from 'state/actions';

const loginLogic = createLogic({
  type: LOGIN,
  process({ action, openSocket, post, setAuthToken }, dispatch, done) {
    const body = {
      ...action.payload
    };
    post('api/users/login', body)
      .then(resp => resp.json())
      .then(({ token }) => {
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const user = jwt_decode(token);
        dispatch(setCurrentUser(user));
        openSocket();
      })
      .catch(err => dispatch(hasErrors(err)))
      .finally(() => done());
  }
});

export default loginLogic;
