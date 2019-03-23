import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import {
  applyMiddleware,
  compose, 
  createStore
} from 'redux';

import createRootReducer from 'state/reducers';

export const history = createBrowserHistory();

const middleware = [
  routerMiddleware(history)
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  createRootReducer(history),
  composeEnhancers(
    applyMiddleware(...middleware)
  )
);

export default store;