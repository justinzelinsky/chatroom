import { LOCATION_CHANGE } from 'connected-react-router';
import { createLogic } from 'redux-logic';
import jwt_decode from 'jwt-decode';

import {
  LOGIN,
  LOGOUT,
  REGISTER,
  setCurrentUser,
  hasErrors,
  logout
} from 'state/actions';
import setAuthToken from 'utils/setAuthToken';

const loginLogic = createLogic({
  type: LOGIN,
  process({ action, axios }, dispatch, done) {
    const body = {
      ...action.payload
    };
    axios.post('api/users/login', body)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const user = jwt_decode(token);
        dispatch(setCurrentUser(user));
      })
      .catch(err => dispatch(hasErrors(err.response.data)))
      .finally(() => done());
  }
});

const logoutLogic = createLogic({
  type: LOGOUT,
  process(_, dispatch, done) {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    done();
  }
});

const registerLogic = createLogic({
  type: REGISTER,
  process({ action, axios, history }, dispatch, done) {
    const body = {
      ...action.payload
    };
    axios.post('/api/users/register', body)
      .then(() => history.push('/login'))
      .catch(err => dispatch(hasErrors(err.response.data)))
      .finally(() => done());
  }
});

let firstTimeLoaded = true;

const routeChangeLogic = createLogic({
  type: LOCATION_CHANGE,
  process({ history }, dispatch, done) {
    if (localStorage.jwtToken && firstTimeLoaded) {
      firstTimeLoaded = false;
      const token = localStorage.jwtToken;
      const user = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (user.exp < currentTime) {
        dispatch(logout());
        dispatch(history.push('landing'));
      } else {
        setAuthToken(token);
        dispatch(setCurrentUser(user));
        dispatch(history.push('chatroom'));
      }
    }
    done();
  }
});

const logic = [
  loginLogic,
  logoutLogic,
  registerLogic,
  routeChangeLogic
];

export default logic;
