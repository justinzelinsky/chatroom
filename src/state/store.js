import { 
  compose, 
  createStore
} from 'redux';

import reducers from 'state/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers()
);

export default store;