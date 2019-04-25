import axios from 'axios';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogicMiddleware } from 'redux-logic';

import logic from 'state/logic';
import createRootReducer from 'state/reducers';

export const history = createBrowserHistory();

const deps = {
  axios,
  history
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
