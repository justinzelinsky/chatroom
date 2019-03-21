import { combineReducers } from 'redux';

import { 
  SELECTED_USERNAME,
  UPDATE_USERNAME
} from 'state/actions';

export const usernameInitialState = '';
export const username = (state = usernameInitialState, action) => {
  if (action.type === UPDATE_USERNAME) {
    return action.payload.username;
  }

  return state;
};

export const usernameSelectedInitialState = false;
export const usernameSelected = (state = usernameSelectedInitialState, action) => {
  if (action.type === SELECTED_USERNAME) {
    return true;
  }
  return state;
};

export default combineReducers({
  username,
  usernameSelected
});
