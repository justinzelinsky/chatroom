import { LOCATION_CHANGE } from 'connected-react-router';
import jwt_decode from 'jwt-decode';
import { createLogic } from 'redux-logic';

import {
  hasErrors,
  LOGIN,
  LOGOUT,
  logout,
  REGISTER,
  SECRET,
  setCurrentUser
} from 'state/actions';

const loginLogic = createLogic({
  type: LOGIN,
  process({ action, post, setAuthToken }, dispatch, done) {
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
      })
      .catch(err => dispatch(hasErrors(err)))
      .finally(() => done());
  }
});

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

const registerLogic = createLogic({
  type: REGISTER,
  process({ action, post, history }, dispatch, done) {
    const body = {
      ...action.payload
    };
    post('/api/users/register', body)
      .then(() => history.push('/login'))
      .catch(err => dispatch(hasErrors(err.response.data)))
      .finally(() => done());
  }
});

const secretLogic = createLogic({
  type: SECRET,
  process({ get }, dispatch, done) {
    get('/secret')
      .then(res => console.log(res.data)) // eslint-disable-line
      .catch(error => console.log(error.data)) // eslint-disable-line
      .finally(() => done());
  }
});

let firstTime = true;

const locationChangeLogic = createLogic({
  type: LOCATION_CHANGE,
  process(_, dispatch, done) {
    if (firstTime) {
      firstTime = false;
      if (localStorage.jwtToken) {
        dispatch(logout());
      }
    }
    done();
  }
});

const logic = [
  loginLogic,
  logoutLogic,
  registerLogic,
  secretLogic,
  locationChangeLogic
];

export default logic;
