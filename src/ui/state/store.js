import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogicMiddleware } from 'redux-logic';

import logic from 'state/logic';
import createRootReducer from 'state/reducers';
import { get, post, setAuthToken } from 'utils/authFetch';
import { emitAddedUser, emitNewChat } from 'utils/socket';

export const history = createBrowserHistory();

const deps = {
  emitAddedUser,
  emitNewChat,
  get,
  history,
  post,
  setAuthToken
};

const middleware = [
  routerMiddleware(history),
  createLogicMiddleware(logic, deps)
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  createRootReducer(history),
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
